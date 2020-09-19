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

        message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 10000}).then(async (collected) => {                  
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
                        connection.disconnect();
                });

        message.reply("")
    },

    roulette: async function(message){  
        const messageHandler = require ('../Handlers/messageHandler');      
        var numbers = Array.from(Array(37).keys()); 

        var beatsAndPlayers = new Array();
        beatsAndPlayers.push({player: "", numbers: []});  

        var rouletteMessage;
        var ballMessage = await message.channel.send("║ --------> **?** <--------");
    
        drawRoulette();

        await message.channel.send("La ruleta del justicialísmo está por empezar, para el burgués que desee probar suerte!");
        connection = await botUtils.joinMemberChannel(message);
        if (!connection)	
        return;       

        const collector = message.channel.createMessageCollector(m => m, {time: 5000})                
        collector.on('collect', m => {
            processBeat(m);
        });           

        collector.on('end', async collected => {
            message.channel.send('No va más, compañeros!');            
            await messageHandler.speakAnswer('./misc/spinning_roulette.mp3', connection, false)
                .then(() => {
                    throwBall(ballMessage, connection);
                })                        
        });        
            
        
        function processBeat(beatMessage){
            //p: pleno
            //d: doble
            //l: linea
            //c: cuadro
            //s: seisena
            //col: columna
            command = beatMessage.content.charAt(0);
            beatNumbers = beatMessage.content.substring(2).split(",");
            
            let currentPlayer = beatsAndPlayers.find(x => x.player == beatMessage.author.id);

            if (!currentPlayer){

                let newPlayer = { player: beatMessage.author.id , playerName: beatMessage.author.username, numbers: new Array()};
                for (b in beatNumbers)
                    newPlayer.numbers.push(beatNumbers[b])

                beatsAndPlayers.push(newPlayer);
            }
            else{
                for(num in beatNumbers){
                    if (currentPlayer.numbers.find(x => x != beatNumbers[num]))
                        currentPlayer.numbers.push(num);
                }
            }
                    
            switch(command){
                case "p":                    
                    for (n in beatNumbers){
                        numbers[beatNumbers[n]] = "**X**"
                    }                                
                    
                    drawRoulette();

                    break;
                case "d":
                

                case "l":


                case "c":


                case "s":
                

                case "col":
            }
        }   

        async function throwBall(ballMessage, connection){
            let randomNumber = Math.round(1 + (36 - 1) * Math.random());
            await ballMessage.edit("║ --------> **" + randomNumber + "** <--------"); 
            
            //define winner
            let winner = "";
            let playerNumbers;

            for(player in beatsAndPlayers){
                playerNumbers = beatsAndPlayers[player].numbers;
                if (playerNumbers.find(x => x == randomNumber))
                    winner = winner + beatsAndPlayers[player].playerName;
            }
            if (winner != ""){
                ballMessage.channel.send(winner.split(",") + ", mi querida plaza se viste de victoria!");
                messageHandler.speakAnswer('./misc/extraordinario.mp3', connection);
            }   
            connection.disconnect();         
        }

        async function drawRoulette(){
            let roulette = [];
            roulette.push("");
            let line = "";
            
            line = line + "║ ";
            for(numIndex in numbers){       
                let n = numbers[numIndex]

                if (n != 0 && n < 10)         
                    n = " " + n;

                if (n == 0)
                    n = "           " + n; 

                if (n == 32)
                    n = " " + n;

                line = line + "    " + n + "    ";

                if (numIndex % 3 == 0){
                    roulette.push(line);
                    line = "║ ";
                }              
            }
            if (!rouletteMessage)
                rouletteMessage = await message.channel.send(roulette);
            else
                rouletteMessage.edit(roulette);
        }
    },
}
  