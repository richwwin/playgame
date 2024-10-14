const { Telegraf } = require('telegraf');
const bot = new Telegraf('7753698807:AAECy2-tLr1yOCA26yvETGqfn1W7OymqyF8');

bot.start((ctx) => {
    ctx.reply('歡迎來到物理起重機遊戲！請點擊下方連結開始遊戲：');
    ctx.reply('https://你的遊戲網址.com');
});

bot.command('register', (ctx) => {
    // 實現會員註冊邏輯
});

bot.launch();
