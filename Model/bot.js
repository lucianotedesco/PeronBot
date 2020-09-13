module.exports = {     
    connect: function(){    
        let Discord = require('discord.js');                
        let bot = new Discord.Client();
        let TOKEN = process.env.TOKEN;

        bot.login(TOKEN);
        bot.on('ready', () => {console.info(`${bot.user.tag} está vivo nuevamente!`);});
        return bot;
    },     

    joinMemberChannel: async function(message) {
        if (message.member.voiceChannel) {
            if(!message.guild.voiceConnection) {
                let result = await message.member.voiceChannel.join()
                return result;
            }            
        }
        else {
            message.reply("compañero, debes estar en un canal de voz para poder enlistarme a él!")
        }
    },

    leaveMemberChannel: function(message) {
        let vc = message.guild.voiceConnection;
        if(vc) vc.disconnect();
    },

    joinSpecificChannel: function(){
        //DEV CHANNEL: 754162348784353344
        //FINISH CHANNEL: 518496390427443317
        //let channel = bot.channels.get("518496390427443317"); 
    }
};