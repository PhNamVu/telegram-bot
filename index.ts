import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const port = 8080;

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log("Status:", res.status);
};

app.post(URI, async (req, res) => {
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text,
  });
  return res.send();
});

app.listen(port, async () => {
  console.log(`🚀 App running on port ${port}`);
  await init();
});
