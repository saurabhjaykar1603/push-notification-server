import Token from "../models/tokenModel.js";
import sendNotification from "../utils/sendNotification.js";

export const registerToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send("Token is required");
  }
  console.log(token);

  try {
    const existingToken = await Token.findOne({ token });
    if (!existingToken) {
      const newToken = new Token({ token });
      await newToken.save();
      return res.status(200).json({ message: "Token saved successfully" });
    }
    return res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    res.status(500).send("Error saving token");
  }
};

export const sendNotificationToAll = async (req, res) => {
  const { title, body } = req.body;

  try {
    const tokens = await Token.find();
    await sendNotification(tokens, title, body);
    res.status(200).send("Notifications sent successfully");
  } catch (error) {
    res.status(500).send("Error sending notifications");
  }
};
