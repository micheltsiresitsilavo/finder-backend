import { check } from "express-validator";

export const validateOnLogin = [
  check("email").isEmail().normalizeEmail().withMessage("Enter e-mail valid"),
];

export const validateOnRegister = [
  check("email").isEmail().withMessage("Enter e-mail valid"),

  check("password")
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage("must be at least 8 chars long")
    .bail()
    .withMessage("must contain a number"),
];
