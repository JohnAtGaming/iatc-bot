const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NTkxNDM1MDkyODk1OTg5NzYw.XQwvtA.qd5a10pXh1RcCIm8U4vkkw1SPzM';

bot.on('ready', () =>{
    console.log('This bot is online!');
})

bot.on('message', msg=>{
    if(msg.content ===  "Hello"){
        msg.reply('Hi! Welcome to the IATC Universe Discord Sever!');
    }
})
bot.on('raw', packet => {

    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;

    const channel = bot.channels.get(packet.d.channel_id);

    if (channel.messages.has(packet.d.message_id)) return;

    channel.fetchMessage(packet.d.message_id).then(message => {
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);

        if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));

        if (packet.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
        }
        
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
        }
    });
});

bot.on('messageReactionAdd', (reaction, user) => {
    var member = reaction.message.guild.members.get(user.id)

    if (reaction.message.channel.name === "rules") {
        //if (reaction.emoji.name === "✅") {
            member.addRole('591388205668892723');
        //}
    }
});

bot.on('messageReactionRemove', (reaction, user) => {
    var member = reaction.message.guild.members.get(user.id)

    if (reaction.message.channel.name === "rules") {
        //if (reaction.emoji.name === "✅") {
            member.removeRole('591388205668892723');
        //}
    }
});
bot.login(token);
