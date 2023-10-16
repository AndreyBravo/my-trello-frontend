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
  body("title").isLength({ min: 5 }).isString(),
  body("description").isLength({ min: 10 }).isString(),
  body("employee").optional().isString(),
];
