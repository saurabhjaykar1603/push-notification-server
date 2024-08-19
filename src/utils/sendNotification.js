import axios from "axios";

const sendNotification = async (tokens, title, body, url, image) => {
  // Create the message payload with optional image
  const messages = tokens.map(({ token }) => ({
    to: token,
    sound: "default",
    title,
    body,
    data: {
      url: url, // Example URL or dynamic URL based on your logic
    },
    ...(image && image), // Include the image URL if provided
  }));
  console.log(messages, "{");

  // Split the messages into chunks of 100
  const chunks = [];
  for (let i = 0; i < messages.length; i += 100) {
    chunks.push(messages.slice(i, i + 100));
  }

  // Send the chunks using axios
  for (const chunk of chunks) {
    await axios.post("https://exp.host/--/api/v2/push/send", chunk, {
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    });
  }
};

export default sendNotification;
