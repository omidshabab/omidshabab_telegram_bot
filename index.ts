import http from "http";
import express from "express";
import { Telegraf, Markup } from "telegraf";

const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
app.use(express.json());

const bot = new Telegraf(process.env.BOT_TOKEN!);

const keyboard = Markup.keyboard([
    Markup.button.pollRequest("Create poll", "regular"),
    Markup.button.pollRequest("Create quiz", "quiz"),
]);

bot.on("poll", ctx => console.log("Poll update", ctx.poll));
bot.on("poll_answer", ctx => console.log("Poll answer", ctx.pollAnswer));

bot.start(ctx => ctx.reply("supported commands: /poll /quiz", keyboard));

bot.command("poll", ctx =>
    ctx.replyWithPoll("Your favorite math constant", ["x", "e", "π", "φ", "γ"], {
        is_anonymous: false,
    }),
);
bot.command("quiz", ctx =>
    ctx.replyWithQuiz("2b|!2b", ["True", "False"], { correct_option_id: 0 }),
);

bot.launch();

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});