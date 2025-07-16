import Logs from "../models/Logs.js";

// Function to fetch latest 20 log data from the database
async function Get(req, res) {
  try {
    const response = await Logs.find({}).sort({ time: -1 }).limit(20);
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
}

export default { Get };
