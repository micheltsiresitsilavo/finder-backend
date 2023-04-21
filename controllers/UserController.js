import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/tokenOp.js";
import { validationResult } from "express-validator";
// import sanitizeHtml from "sanitize-html";

//Read users
export const users = async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        avatar: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.send("Il y a une lors de récupération de users");
  }
};

//Create user
export const store = async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

export const vola = (_, res) => {
  res.json({
    privatePage: true,
    security: "high",
    gift: "2000000Ar",
  });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const checkPwd = await bcrypt.compare(password, user.password);
    if (!checkPwd) {
      res.status(400).json({ message: "Password Incorrect" });
      return;
    }
    const token = signToken(user.id, user.email);
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res.status(400).json({ message: "Email invalid" });
  }
};

export const register = async (req, res) => {
  //Check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.errors });
  }

  try {
    const { email, password, name, location, status } = req.body;

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userExist) {
      res.status(400).json({ message: "Email already taken" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        location,
        status,
      },
    });
    const token = signToken(newUser.id, newUser.email);
    res
      .status(200)
      .json({ user: newUser, token: token, message: "Registration ok" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const user = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      avatar: true,
      area: true,
      skills: true,
      portfolio: true,
      language: true,
      formation: true,
      post: true,
    },
  });
  res.status(200).json({ user: user });
};

export const update = async (req, res) => {
  const { email, name, lastName, contact, location, bio } = req.body;
  try {
    const { id } = req.params;
    const userUpdate = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email,
        name,
        lastName,
        contact,
        location,
        bio,
      },
    });
    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};
