const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const token = '';
const bot = new TelegramBot(token, { polling: true });
const ethers = require('ethers');

const API_KEY = "QJ8XU1PQFA86WNKRYJSFQBGXUDDJZ3G4GE";
const ADDRESS = "0x52d562cae69682D37183885b0FFb01959f0b211E";

let chatId = "";
let detailMint = [];
let lastArrayLenth = 0;
let firstTime = true;

bot.onText(/\/start/, (msg) => {
    firstTime = false;
    chatId = msg.chat.id;
    bot.sendMessage(chatId, 'AstroAI bot is running');
});

bot.onText(/\/restart/, (msg) => {
    firstTime = false;
    chatId = msg.chat.id;
    bot.sendMessage(chatId, 'AstroAI bot is running');
});

setInterval(() => {
    setTimeout(async () => {
        try {
            let res = await axios.get(`https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=999999999&address=${ADDRESS}&topic0=0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0&apikey=${API_KEY}`);
            let arr = res.data.result;
            if (lastArrayLenth !== arr.length) {
                let numChange = Math.abs(arr.length - lastArrayLenth);
                lastArrayLenth = arr.length;
                detailMint = arr.slice(numChange, arr.length);

                if (!firstTime) {
                    for (let i = 0; i < detailMint.length; i++) {
                        let message = ``;
                        let item = detailMint[i];
                        let tokenId = parseInt(item.topics[3]);
                        let minter = ethers.utils.defaultAbiCoder.decode(['address'], item.topics[2])[0];
                        let resp = await axios.get(`https://ipfs.io/ipfs/QmaM2hw4Pdyos3u6pSe7bvdyARwzG5NnmM2KYNfLYPMuX8/${tokenId}.json`);
                        message += `<b>${resp.data.name} #${tokenId}</b> has been minted \n<b>Minter:</b> ${minter.substring(0, 5)}...${minter.substring(minter.length - 4, minter.length)}\n\n`;
                        let photo = `https://ipfs.io/ipfs/QmXWWcSRZ9ck3r9zEVawAfu2sXdbF3dSSP312zFr2LQEyc/${tokenId}.png`;
                        bot.sendPhoto(chatId, photo, { parse_mode: 'HTML', caption: message });
                    }
                }
            }
        } catch (error) {
            console.log("error at contract 1");
            console.log(error.message);
        }
    }, 0);

    console.log("lastArrayLenth", lastArrayLenth);
}, 1000 * 10);
