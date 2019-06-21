const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () =>{
    console.log('This bot is online!');
});

bot.on('message', msg=>{
    if(msg.content ===  "Hello"){
        msg.reply('Hi! Welcome to the IATC Universe Discord Sever!');
    }
});

// THIS MUST BE THIS WAY
bot.login(process.env.BOT_TOKEN);
