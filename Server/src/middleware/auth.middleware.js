import jwt from "jsonwebtoken";

async function verifytoken(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token[1])
      return req.status(400).json({ message: "Please Give Token" });
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.body.username = decoded.username;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Token" });
  }
}

export default verifytoken;
