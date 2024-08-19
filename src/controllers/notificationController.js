import Token from "../models/tokenModel.js";
import sendNotification from "../utils/sendNotification.js";


export const registerToken = async (req, res) => {
  const { token, userId } = req.body;
  
  if (!token) {
    return res.status(400).send("Token is required");
  }

  try {
    const existingToken = await Token.findOne({ token });
    if (!existingToken) {
      const newToken = new Token({ token, userId });
      await newToken.save();
      return res.status(200).json({ message: "Token saved successfully" });
    }
    return res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    res.status(500).send("Error saving token");
  }
};

export const sendNotificationToAll = async (req, res) => {
  const { title, body, image, url } = req.body;
  console.log(req.body);

  try {
    const tokens = await Token.find();
    // console.log(tokens);

    await sendNotification(tokens, title, body, url, image);
    res.status(200).send("Notifications sent successfully");
  } catch (error) {
    res.status(500).send("Error sending notifications");
    console.log(error.message);
  }
};
