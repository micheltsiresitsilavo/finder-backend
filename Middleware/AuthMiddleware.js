import { verifyToken } from "../utils/tokenOp.js";
/**
 * Ty dia middleware authentication izay guard hoan'izay  private route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const AuthMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(400).json({ message: "Token Invalid" });
  }
  const tokenBack = authorization.split(" ")[1];
  try {
    const decoded = verifyToken(tokenBack);
    res.status(200).json(decoded);
    next();
  } catch (error) {
    throw res.status(400).json({ message: error });
  }
};
export default AuthMiddleware;
