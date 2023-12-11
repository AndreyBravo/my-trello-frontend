import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from '../models/User.js';
// import { pool } from "../db.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const isEmail = await User.findOne({ where: { email: req.body.email } });
    if (isEmail) {
      return res.status(400).json({ message: 'Email уже существует' });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
      rang: 1,
      isAdmin: false,
    });

    const token = jwt.sign({ _id: newUser.id }, "secret123", { expiresIn: "30d" });

    res.json({ token });
  } catch (err) {
    console.error('Ошибка при регистрации пользователя:', err);
    res.status(500).json({ message: 'Не удалось зарегистрироваться' });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(400).json({
        message: "Нет такого пользователя",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user.id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      fullName: user.fullName,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ 
      attributes: ['email', 'fullName'], 
      where: { id: req.userId } 
    });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    res.json({
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Произошла ошибка при получении данных пользователя",
    });
  }
};

// export const register = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json(errors.array());
//     }

    

//     // const isEmail = await pool.query("SELECT email FROM users WHERE email=$1",[req.body.email])
//     // if(isEmail.rowCount !== 0){
//     //   console.log(isEmail);
//     //   return res.json({
//     //     message:"email is exists"
//     //   });
//     // }

//     const password = req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     // const user = await pool.query(
//     //   "INSERT INTO users(fullName,email,passwordHash) values($1,$2,$3) RETURNING id",
//     //   [req.body.fullName, req.body.email, hash]
//     // );

//     const user = {};

//     User.create({
//       fullName: req.body.fullName,
//       email: req.body.email,
//       passwordHash: hash,
//       rang: 1,
//       isAdmin: false,
//     })
//       .then((newuser) => {
//         user = newuser;
//         console.log("User created:", newuser.toJSON());
//       })
//       .catch((error) => {
//         if (error.name === "SequelizeUniqueConstraintError") {
//           console.error("User with this email already exists");
//           res.status(500).json({
//             message: "User with this email already exists"
//           });
//           // Здесь можно обработать ошибку, например, отправить сообщение об ошибке обратно пользователю
//         } else {
//           console.error("Error creating user:", error);
//         }
//       });

//     const token = jwt.sign(
//       {
//         _id: user.id,
//       },
//       "secret123",
//       {
//         expiresIn: "30d",
//       }
//     );

//     // const { passwordHash, ...userData } = user

//     res.json({
//       token,
//     });
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       message: "Не удалось зарегистрироваться"
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const user = await pool.query(
//       "SELECT id,email,passwordhash,fullname FROM users WHERE email=$1",
//       [req.body.email]
//     );

//     if (user.rowCount === 0) {
//       return res.status(400).json({
//         message: "Нет такого пользователя",
//       });
//     }

//     const isValidPass = await bcrypt.compare(
//       req.body.password,
//       user.rows[0].passwordhash
//     );

//     if (!isValidPass) {
//       return res.status(400).json({
//         message: "Неверный логин или пароль",
//       });
//     }

//     const token = jwt.sign(
//       {
//         _id: user.rows[0].id,
//       },
//       "secret123",
//       {
//         expiresIn: "30d",
//       }
//     );

//     // const { passwordHash, ...userData } = user._doc;

//     res.json({
//       fullName: user.rows[0].fullname,
//       token,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Не удалось авторизоваться",
//     });
//   }
// };

// export const getMe = async (req, res) => {
//   try {
//     const user = await pool.query(
//       "SELECT email,fullname FROM users WHERE id=$1",
//       [req.userId]
//     );
//     // const user = await UserModel.findById(req.userId);

//     if (!user) {
//       res.status(404).json({
//         message: "Пользователь не найден",
//       });
//     }

//     // const { passwordHash, ...userData } = user._doc;

//     res.json({
//       fullName: user.rows[0].fullname,
//       email: user.rows[0].email,
//     });
//   } catch (err) {}
// };
