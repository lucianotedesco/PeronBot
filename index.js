require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

//DEV CHANNEL: 754162348784353344
//FINISH CHANNEL: 518496390427443317

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'Viva Peron!') {
	  //msg.reply('pong');
  
	  const channel = bot.channels.get("518496390427443317");
	  if (!channel) return console.error("The channel does not exist!");
	  channel.join().then(connection => {
		// Yay, it worked!
		console.log("Successfully connected.");
		
		const dispatcher = connection.playFile('misc/amigo-enemigo.mp3');
		dispatcher.on('start', () => {
		  console.log('Reproduciendo: Amigo-Enemigo');
		});		

	  }).catch(e => {
		// Oh no, it errored! Let's log it to console :)
		console.error(e);
	  });


  }  
});



