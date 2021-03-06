const games = require ('../Model/games.js');
const audio = require ('./audioHandler.js');

module.exports = {     
  shouldPlay: function(message){   
    let cleanMessage = message.content.toLowerCase();

    let foundPhrase = this.dictionary.find(o => o.phrase == cleanMessage)
    if (!foundPhrase){
      console.log("No encuentro: " + cleanMessage);
      return null;
    }    
    return foundPhrase;
  },

  shouldAnswer: function(message){   
    let cleanMessage = message.content.toLowerCase();

    let answer = this.dictionary.find(o => o.phrase == cleanMessage)
    if (!answer)
      return null;    

    if(answer.doSomething){
      answer.doSomething(message);
    }else{
      return answer;
    }
    
  },

  dictionary: [
    {
      phrase: 'viva peron!',
      audioFile: './misc/amigo-enemigo.mp3'
    },
    {
      phrase: 'partido justicialista',
      audioFile: './misc/nuestro-movimiento-es-socialista-nacional.mp3'
    },
    {
      phrase: '!peron numero',
      audioFile: '',
      doSomething: function (message) { games.guessTheNumber(message) },
    },
    {
      phrase: '!peron ruleta',
      audioFile: '',
      doSomething: function (message) { games.roulette(message) },
    }
  ],

  speakAnswer: function(audioFile, connection, shouldDisconnect = true){ 
    return audio.play(audioFile, connection, shouldDisconnect).then();
  },
};