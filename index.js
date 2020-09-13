const config = require('dotenv').config();
const botUtils = require ('./Model/bot.js');
const messageHandler = require ('./Handlers/messageHandler');
const bot = botUtils.connect();

bot.on('message', async (msg) => {	
	if (msg.author.bot) 
		return;
		
	let phrase = messageHandler.shouldAnswer(msg);
	if (phrase){
		let connection = await botUtils.joinMemberChannel(msg);
		//si el bot ya esta respondiendo, no habrá conexión.
		if (connection)		
			messageHandler.speakAnswer(phrase.audioFile, connection);		
	}	
});