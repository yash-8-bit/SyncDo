import User from "../models/User.js";
async function Details(req, res) {
  try {
    const username = req.user;
    const response = await User.findOne({ username: username });
    res.status(200).json({ data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Try Again Later.." });
  }
}

async function Delete(req, res) {
  try {
    const username = req.user;
    await User.deleteOne({ username: username });
    res.status(200).json({ message: "Account Delete Successfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Try Again Later.." });
  }
}

export default { Delete, Details };
