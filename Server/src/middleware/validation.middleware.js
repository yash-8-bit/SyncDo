import mongoose from "mongoose";

// middleware to verify the _id of mongoDB
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

async function verifytitle(req, res, next) {
  try {
    const non_valid_title = ["todo", "inprogress", "done"];
    const { title } = req.body;
    let s = title.replaceAll(" ", "").toLowerCase();
    if (non_valid_title.includes(s))
      return res.status(400).json({
        message: `Title cannot be the same as ${non_valid_title.join(",")}.`,
      });
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Try Again Later..." });
  }
}

export { verifyid, verifytitle };
