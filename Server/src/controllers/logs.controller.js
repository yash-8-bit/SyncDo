import Logs from "../models/Logs.js";

async function Get(req, res) {
  try {
    const response = await Logs.find({}).sort({ time: -1 }).limit(20);
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
}

export default { Get };
