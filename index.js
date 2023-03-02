const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const token = '6117504816:AAEKnDLkt7QazWST5u8Al3bNc10P-wBafoY';
const bot = new TelegramBot(token, { polling: true });
const ethers = require('ethers');

const API_KEY = "QJ8XU1PQFA86WNKRYJSFQBGXUDDJZ3G4GE";
const ADDRESS = "0x8e14651218E7667E3f9063b5B2144A0bE1EB3195";
const ADDRESS2 = "0x1f0A920e8fdC00142489e416e12ba2e9f0910b84";
const ADDRESS3 = "0x9c3F6A91CCdfC85165CE3190459f0D86ae471a03";
const ADDRESS4 = "0xeaEf75BB3C6618C21e83ED0994ABe6fbae72af93";

let chatId = "";
let numMint = [0, 0, 0, 0];
let detailMint = [[], [], [], []];
let lastArrayLenth = [0, 0, 0, 0];
let firstTime = true;

bot.onText(/\/start/, (msg) => {
    firstTime = false;
    chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Empire bot is running');
});

bot.onText(/\/restart/, (msg) => {
    firstTime = false;
    chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Empire bot is running');
});

setInterval(() => {
    setTimeout(async () => {
        try {
            let res = await axios.get(`https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=999999999&address=${ADDRESS}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&apikey=${API_KEY}`);
            let arr = res.data.result;
            if (lastArrayLenth[0] !== arr.length) {
                let numChange = Math.abs(arr.length - lastArrayLenth[0]);
                lastArrayLenth[0] = arr.length;
                detailMint[0] = arr.slice(numChange, arr.length);

                if (!firstTime) {
                    for (let i = 0; i < detailMint[0].length; i++) {
                        let message = ``;
                        let item = detailMint[0][i];
                        let tokenId = parseInt(item.topics[3]);
                        let minter = ethers.utils.defaultAbiCoder.decode(['address'], item.topics[2])[0];
                        let resp = await axios.get(`https://ipfs.io/ipfs/QmTLNtLN1RVPY2sqVFDoHQgPF4QHzsqwvaJyFcpQmbrDMp/${tokenId}.json`);
                        message += `<b>${resp.data.name} #${tokenId}</b> has been minted \n<b>Minter:</b> ${minter.substring(0, 5)}...${minter.substring(minter.length - 4, minter.length)}\n\n`;
                        let photo = `https://ipfs.io/ipfs/QmTtyzT51nUbV1M9E9kJ7dH57223jrjsvvHzYip51Ut11V/${tokenId}.png`;
                        bot.sendPhoto(chatId, photo, { parse_mode: 'HTML', caption: message });
                    }
                }
            }
        } catch (error) {
            console.log("error at contract 1");
            console.log(error.message);
        }
    }, 0);

    // 2
    setTimeout(async () => {
        try {
            let res = await axios.get(`https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=999999999&address=${ADDRESS2}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&apikey=${API_KEY}`);
            let arr = res.data.result;
            if (lastArrayLenth[1] !== arr.length) {
                let numChange = Math.abs(arr.length - lastArrayLenth[1]);
                lastArrayLenth[1] = arr.length;
                detailMint[1] = arr.slice(numChange, arr.length);

                if (!firstTime) {
                    for (let i = 0; i < detailMint[1].length; i++) {
                        let message = ``;
                        let item = detailMint[1][i];
                        let tokenId = parseInt(item.topics[3]);
                        let minter = ethers.utils.defaultAbiCoder.decode(['address'], item.topics[2])[0];
                        let resp = await axios.get(`https://ipfs.io/ipfs/QmNnf8TGrpb84eiWBJgF2qFGhvdc81KFH1K3vy2MYs5UYx/${tokenId}.json`);
                        message += `<b>${resp.data.name} #${tokenId}</b> has been minted \n<b>Minter:</b> ${minter.substring(0, 5)}...${minter.substring(minter.length - 4, minter.length)}\n\n`;
                        let photo = `https://ipfs.io/ipfs/QmY7mN1jxN5ZM7LjMwLDnaUNLh4MdGR2eWd55EvWCnmcmv/${tokenId}.png`;
                        bot.sendPhoto(chatId, photo, { parse_mode: 'HTML', caption: message });
                    }
                }
            }
        } catch (error) {
            console.log("error at contract 2");
            console.log(error.message);
        }
    }, 0);

    // 3
    setTimeout(async () => {
        try {
            let res = await axios.get(`https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=999999999&address=${ADDRESS3}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&apikey=${API_KEY}`);
            let arr = res.data.result;
            if (lastArrayLenth[2] !== arr.length) {
                let numChange = Math.abs(arr.length - lastArrayLenth[2]);
                lastArrayLenth[2] = arr.length;
                detailMint[2] = arr.slice(numChange, arr.length);

                if (!firstTime) {
                    for (let i = 0; i < detailMint[2].length; i++) {
                        let message = ``;
                        let item = detailMint[2][i];
                        let tokenId = parseInt(item.topics[3]);
                        let minter = ethers.utils.defaultAbiCoder.decode(['address'], item.topics[2])[0];
                        let resp = await axios.get(`https://ipfs.io/ipfs/QmZytLCYVvAsnVCq9YEiEZ8qCTd1K7uzh9kKeVc3oJrYzj/${tokenId}.json`);
                        message += `<b>${resp.data.name} #${tokenId}</b> has been minted \n<b>Minter:</b> ${minter.substring(0, 5)}...${minter.substring(minter.length - 4, minter.length)}\n\n`;
                        let photo = `https://ipfs.io/ipfs/QmVR4weQdhvk9CBS8Eydvhgf6UG9bV7uXNXZe9wnfm3LoG/${tokenId}.png`;
                        bot.sendPhoto(chatId, photo, { parse_mode: 'HTML', caption: message });
                    }
                }
            }
        } catch (error) {
            console.log("error at contract 3");
            console.log(error.message);
        }
    }, 0);

    // 4
    setTimeout(async () => {
        try {
            let res = await axios.get(`https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=999999999&address=${ADDRESS4}&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&apikey=${API_KEY}`);
            let arr = res.data.result;
            if (lastArrayLenth[3] !== arr.length) {
                let numChange = Math.abs(arr.length - lastArrayLenth[3]);
                lastArrayLenth[3] = arr.length;
                detailMint[3] = arr.slice(numChange, arr.length);

                if (!firstTime) {
                    for (let i = 0; i < detailMint[3].length; i++) {
                        let message = ``;
                        let item = detailMint[3][i];
                        let tokenId = parseInt(item.topics[3]);
                        let minter = ethers.utils.defaultAbiCoder.decode(['address'], item.topics[2])[0];
                        let resp = await axios.get(`https://ipfs.io/ipfs/QmZdULiUGAXTZSLoXMUVecDQo63ve3BwGyrcxcotAQxMJu/${tokenId}.json`);
                        message += `<b>${resp.data.name} #${tokenId}</b> has been minted \n<b>Minter:</b> ${minter.substring(0, 5)}...${minter.substring(minter.length - 4, minter.length)}\n\n`;
                        let photo = `https://ipfs.io/ipfs/QmcqmXH2pBuHtKTQfGGA6FCh7kszcpF584SXQhabpvqz5m/${tokenId}.png`;
                        bot.sendPhoto(chatId, photo, { parse_mode: 'HTML', caption: message });
                    }
                }
            }
        } catch (error) {
            console.log("error at contract 4");
            console.log(error.message);
        }
    }, 0);

    console.log("numMint", numMint);
    console.log("lastArrayLenth", lastArrayLenth);
}, 1000 * 10);