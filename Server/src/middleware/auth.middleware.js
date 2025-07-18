import jwt from "jsonwebtoken";

// middleware to verify the token
async function verifytoken(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.status(400).json({ message: "Please Give Token" });
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.username;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Token" });
  }
}

export default verifytoken;
