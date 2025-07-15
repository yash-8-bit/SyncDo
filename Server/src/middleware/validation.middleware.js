import mongoose from "mongoose";

async function verifyid(req, res, next) {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).json({ message: "Please Give Valid Doc Id" });
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Try Again Later..." });
  }
}

export default verifyid;
