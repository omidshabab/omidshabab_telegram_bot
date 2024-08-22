import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start(ctx => {
    return ctx.reply(`Hello ${ctx.update.message.from.first_name}!`);
})

bot.launch();