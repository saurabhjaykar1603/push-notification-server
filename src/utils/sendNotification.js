import axios from "axios";

const sendNotification = async (tokens, title, body) => {
  const messages = tokens.map(({ token }) => ({
    to: token,
    sound: "default",
    title,
    body,
  }));

  const chunks = [];
  for (let i = 0; i < messages.length; i += 100) {
    chunks.push(messages.slice(i, i + 100));
  }

  for (const chunk of chunks) {
    await axios.post("https://exp.host/--/api/v2/push/send", chunk, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
};

export default sendNotification;
