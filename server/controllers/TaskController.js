// import { pool } from "../db.js";
import { validationResult } from "express-validator";
import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const newTask = await Task.create({
      status: req.body.status,
      title: req.body.title,
      content: req.body.content,
      employer: req.body.employer,
      employee: req.body.employee,
      grade: req.body.grade,
      deadLine: req.body.deadLine,
    });

    res.json({
      message: "Успешно создана задача",
      newTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось добавить задачу",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Задача не найдена",
      });
    }

    await task.destroy();

    res.json({
      message: "Успешно удалена задача",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось удалить задачу",
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId, {
      attributes: ['status', 'title', 'content', 'employer', 'employee', 'grade', 'deadLine'],
    });

    if (!task) {
      return res.status(404).json({
        message: "Задача не найдена",
      });
    }

    res.json({
      task,
      message: "Успешно получена задача",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось получить задачу",
    });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'status', 'title', 'content', 'employer', 'employee', 'grade', 'deadLine'],
    });

    res.json({
      tasks,
      message: "Успешно получены задачи",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось получить задачи",
    });
  }
};

// export const createTask = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json(errors.array());
//     }

//     // const isEmail = await pool.query("SELECT email FROM users WHERE email=$1", [
//     //   req.body.email,
//     // ]);
//     // if (isEmail.rowCount !== 0) {
//     //   console.log(isEmail);
//     //   return res.json({
//     //     message: "email is exists",
//     //   });
//     // }

//     const task = await pool.query(
//       "INSERT INTO tasks(status,title,content,employer,employee,date_of_create,deadLine) values($1,$2,$3,$4,$5,$6,$7)",
//       [
//         req.body.status,
//         req.body.title,
//         req.body.content,
//         req.body.employer,
//         req.body.employee,
//         req.body.dateOfCreate,
//         req.body.deadLine,
//       ]
//     );

//     res.json({
//       message: "Успешно созданна задача",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Не удалось добавить задачу",
//     });
//   }
// };

// export const deleteTask = async (req, res) => {
//   try {
//     //   const errors = validationResult(req);
//     //   if (!errors.isEmpty()) {
//     //     return res.status(400).json(errors.array());
//     //   }

//     // const isEmail = await pool.query("SELECT email FROM users WHERE email=$1", [
//     //   req.body.email,
//     // ]);
//     // if (isEmail.rowCount !== 0) {
//     //   console.log(isEmail);
//     //   return res.json({
//     //     message: "email is exists",
//     //   });
//     // }

//     const task = await pool.query("DELETE FROM tasks WHERE id = $1", [
//       req.params.id,
//     ]);

//     res.json({
//       message: "Успешно удалена задача",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Не удалось удалить задачу",
//     });
//   }
// };

// export const getTask = async (req, res) => {
//   try {
//     //   const errors = validationResult(req);
//     //   if (!errors.isEmpty()) {
//     //     return res.status(400).json(errors.array());
//     //   }

//     // const isEmail = await pool.query("SELECT email FROM users WHERE email=$1", [
//     //   req.body.email,
//     // ]);
//     // if (isEmail.rowCount !== 0) {
//     //   console.log(isEmail);
//     //   return res.json({
//     //     message: "email is exists",
//     //   });
//     // }

//     const task = await pool.query(
//       "SELECT status,title,content,employer,employee,TO_CHAR(date_of_create, 'YYYY-MM-DD') AS date_of_create,TO_CHAR(deadLine, 'YYYY-MM-DD') AS deadLine  FROM tasks WHERE id = $1",
//       [req.params.id]
//     );

//     res.json({
//       task: task?.rows[0],
//       message: "Успешно получена задача",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Не удалось получить задачу",
//     });
//   }
// };

// export const getAllTask = async (req, res) => {
//   try {
//     //   const errors = validationResult(req);
//     //   if (!errors.isEmpty()) {
//     //     return res.status(400).json(errors.array());
//     //   }

//     // const isEmail = await pool.query("SELECT email FROM users WHERE email=$1", [
//     //   req.body.email,
//     // ]);
//     // if (isEmail.rowCount !== 0) {
//     //   console.log(isEmail);
//     //   return res.json({
//     //     message: "email is exists",
//     //   });
//     // }

//     const task = await pool.query(
//       "SELECT id,status,title,content,employer,employee,TO_CHAR(date_of_create, 'YYYY-MM-DD') AS date_of_create,TO_CHAR(deadLine, 'YYYY-MM-DD') AS deadLine  FROM tasks "
//     );

//     res.json({
//       task: task?.rows,
//       message: "Успешно получена задача",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Не удалось получить задачу",
//     });
//   }
// };
