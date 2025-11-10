import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  // accept either "x-auth-token" or "Authorization: Bearer ..."
  const header = req.header("x-auth-token") || req.header("authorization");
  if (!header) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    res.status(400).json({ msg: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ msg: "Admin only" });
  next();
};
