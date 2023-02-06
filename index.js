const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const token = '5974715688:AAFNK-BEXCVAdgl54805fWYdR2Aw5kRCC8w';
const bot = new TelegramBot(token, { polling: true });

const LOCAL_DATA = new Map();

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello, I am an artificial intelligence super tool created by Zenithereum.AI You can use /help to see more information.');
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Ask me anything. I was created by Zenithereum Software Engineer
     1. / ask any question in chat 
     2. Use / imagine to generate a image
    ---------------------------------
    About us:
        -Website: https://zenithereum.ai
        -Twitter: https://twitter.com/zenithereum
        -Telegram: t.me/zenithereumai`);
});

bot.onText(/\/ask/, async (msg) => {
    const chatId = msg.chat.id;
    let message = msg.text.toLowerCase();

    console.log(`${msg.from.first_name}:`, message);
    
    if(message === "/start" || message === "/help") return;

    if (message.length > 0) {
        try {
            if(!checkDefaultMessage(chatId, message)){
                let response = await axios.post("https://zenithereum.vercel.app/api/chat", {
                    message: message,
                }).then(res => res.data);
    
                bot.sendMessage(chatId, response.data);
            }
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

bot.onText(/\/imagine/, async (msg) => {
    const chatId = msg.chat.id;
    let message = msg.text.toLowerCase();

    console.log(`${msg.from.first_name}:`, message);
    
    if(message === "/start" || message === "/help") return;

    if (message.length > 0) {
        try {
            if(!checkDefaultMessage(chatId, message)){
                let response = await axios.post("https://zenithereum.vercel.app/api/image", {
                    message: message,
                }).then(res => res.data);
    
                bot.sendPhoto(chatId, response.data[0]);
            }
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

const checkDefaultMessage = (chatId, message) => {
    if (message.length > 0 && (message.includes("your name") || message.includes("who are you")) || message.includes("yo name") || message.includes("u name") || message.includes("who r u")) {
        bot.sendMessage(chatId, "My name is ZenithereumAI.");
        return true;
    }

    if (message.length > 0 && message.includes("your website")) {
        bot.sendMessage(chatId, "My website is zenithereum.ai.");
        return true;
    }

    if (message.length > 0 && message.includes("your twitter")) {
        bot.sendMessage(chatId, "My Twitter is https://twitter.com/zenithereum.");
        return true;
    }

    if (message.length > 0 && (message === "hi" || message === "hello")) {
        bot.sendMessage(chatId, "Hi, can I help you?");
        return true;
    }

    return false;
}
