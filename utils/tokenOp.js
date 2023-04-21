import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const signToken = (id, email) => {
  // const maxAge = 3 * 24 * 60 * 60;
  const token = jwt.sign({ id, email }, SECRET_KEY, { expiresIn: "30d" });
  return token;
};

export const verifyToken = (tokenVerify) => {
  const decoded = jwt.verify(tokenVerify, SECRET_KEY);
  return decoded;
};
