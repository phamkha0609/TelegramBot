const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const token = '6117504816:AAEKnDLkt7QazWST5u8Al3bNc10P-wBafoY';
const bot = new TelegramBot(token, { polling: true });
const ethers = require('ethers');

const API_KEY = "QJ8XU1PQFA86WNKRYJSFQBGXUDDJZ3G4GE";
const ADDRESS = "0x8e14651218E7667E3f9063b5B2144A0bE1EB3195";
let chatId = "";
let numMint = 0;
let detailMint = [];
let lastArrayLenth = 0;
let firstTime = true;

bot.onText(/\/start/, (msg) => {
    chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Empire bot is running');
});

bot.onText(/\/restart/, (msg) => {
    chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Empire bot is running');
});

setInterval(() => {
    setTimeout(async () => {
        try {
            if (chatId !== "") {
                //get data from bsc
                let res = await axios.get(`https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=999999999&address=${ADDRESS}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&apikey=${API_KEY}`);
                let arr = res.data.result;
                if(lastArrayLenth !== arr.length){
                    numMint = arr.length - lastArrayLenth;
                    lastArrayLenth = arr.length;
                    detailMint = arr.slice(arr.length - numMint, arr.length);

                    console.log(numMint);

                    if(!firstTime){
                        for (let i = 0; i < detailMint.length; i++) {
                            let message = ``;
                            let item = detailMint[i];
                            let tokenId = parseInt(item.topics[3]);
                            let minter = ethers.utils.defaultAbiCoder.decode(['address'], item.topics[2])[0];
                            let resp = await axios.get(`https://ipfs.io/ipfs/QmTLNtLN1RVPY2sqVFDoHQgPF4QHzsqwvaJyFcpQmbrDMp/${tokenId}.json`);
                            message += `<b>${resp.data.name} #${tokenId}</b> has been minted \n<b>Minter:</b> ${minter.substring(0, 5)}...${minter.substring(minter.length - 4, minter.length)}\n\n`;
                            let photo = `https://ipfs.io/ipfs/QmTtyzT51nUbV1M9E9kJ7dH57223jrjsvvHzYip51Ut11V/${tokenId}.png`;
                            bot.sendPhoto(chatId, photo, {parse_mode: 'HTML', caption: message});
                        }
                    }else{
                        firstTime = false;
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }, 0);
}, 1000 * 10);