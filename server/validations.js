import { body } from "express-validator";

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 })
];

export const taskCreateValidation = [
  body("status").isLength({ min: 1 }).isString(),
  body("title").isLength({ min: 1 }).isString(),
  body("content").isLength({ min: 5 }).isString(),
  body("employer").optional().isString(),
  body("employee").optional().isString(),
  body("grade").optional(),
  body("deadLine").optional().isDate()
];


