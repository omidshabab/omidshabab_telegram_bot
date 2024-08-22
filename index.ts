import http from "http";
import express from "express";
import { Telegraf } from "telegraf";

const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

const bot = new Telegraf(process.env.BOT_TOKEN!);

app.use(express.json());

bot.start(ctx => {
    return ctx.reply(`Hello ${ctx.update.message.from.first_name}!`);
})

bot.launch();

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});