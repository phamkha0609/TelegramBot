const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const token = '5974715688:AAFNK-BEXCVAdgl54805fWYdR2Aw5kRCC8w';
const bot = new TelegramBot(token, { polling: true });

const LOCAL_DATA = new Map();

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello, I am an artificial intelligence super tool created by Zenithereum.AI You can use /help to see all commands.');
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'This is list of commands: \n /start - start bot \n /help - show all commands \n /zen - send message to Genetek Bot');
});

bot.onText(/\/zen/, async (msg) => {
    const chatId = msg.chat.id;
    let message = msg.text.replace('/zen', '')
    console.log(message);
    if (message.length > 0) {
        try {
            let response = await axios.post("https://zenithereum.vercel.app/api/chat", {
                message: message,
            }).then(res => res.data);

            bot.sendMessage(chatId, response.data);
        } catch (error) {
            bot.sendMessage(chatId, "Something went wrong, please try again!");
            const url = `https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png`;
            bot.sendPhoto(chatId, url);
        }
    } else {
        bot.sendMessage(chatId, "Please enter something!");
        const url = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpXQgNS6hHK_Boi-oGF8yGgfH692RxCM2u3Q&usqp=CAU`;
        bot.sendPhoto(chatId, url);
    }
})