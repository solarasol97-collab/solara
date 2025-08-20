// middleware/authMiddleware.js
import { verifyToken } from "../lib/jwt.js";

export const authMiddleware = (req) => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = verifyToken(token); // Will throw if invalid
  return user;
};
