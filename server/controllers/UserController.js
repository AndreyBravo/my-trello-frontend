import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";
import { pool } from "../db.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const isEmail = await pool.query("SELECT email FROM users WHERE email=$1",[req.body.email])
    if(isEmail.rowCount !== 0){
      console.log(isEmail);
      return res.json({
        message:"email is exists"
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await pool.query(
      "INSERT INTO users(fullName,email,passwordHash) values($1,$2,$3) RETURNING id",
      [req.body.fullName, req.body.email, hash]
    );

    console.log(user.rows[0].id);

    const token = jwt.sign(
      {
        _id: user.rows[0].id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    // const { passwordHash, ...userData } = user

    res.json({
     
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await pool.query("SELECT id,email,passwordhash,fullname FROM users WHERE email=$1",[req.body.email])

    if(user.rowCount === 0){
      return res.status(400).json({
        message: "Нет такого пользователя",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.rows[0].passwordhash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user.rows[0].id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    // const { passwordHash, ...userData } = user._doc;

    res.json({
      fullName: user.rows[0].fullname,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await pool.query("SELECT email,fullname FROM users WHERE id=$1",[req.userId])
    // const user = await UserModel.findById(req.userId);

    if (!user) {
      res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    // const { passwordHash, ...userData } = user._doc;

    res.json({
      fullName: user.rows[0].fullname,
      email: user.rows[0].email,
    });
  } catch (err) {}
};
