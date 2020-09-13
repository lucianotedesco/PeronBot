const botUtils = require ('../Model/bot.js');
var connection = {};

module.exports = {  
    guessTheNumber: async function(message){    
        connection = await botUtils.joinMemberChannel(message);
        if (!connection)	
        return;

        await message.channel.send("Compañero! Adivine el numero que estoy pensando, del 1 al 36...");
        var randomNumber = Math.round(1 + (36 - 1) * Math.random());
        console.log("NUM:" + randomNumber);

        // First argument is a filter function - which is made of conditions
        // m is a 'Message' object
        message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 15000}).then(async (collected) => {
                  
                    const messageHandler = require ('../Handlers/messageHandler');

                    if (collected.first().content == randomNumber) {
                        console.log("GANO");
                        messageHandler.speakAnswer('./misc/extraordinario.mp3', connection);	
                        return;
                    }
                    else{
                        messageHandler.speakAnswer('./misc/bruto_malo.mp3', connection);
                        console.log("PIERDO");                         	
                        return;
                    }
                                    
                }).catch((error) => {
                        message.reply('No he recibido respuesta compañero, me retiro');
                        console.log(error);
                });

        message.reply("")
    },
}
  