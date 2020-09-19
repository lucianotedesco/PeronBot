module.exports = {     
    play: async function(filePath, connection, shouldDisconnect = true){ 
        let dispatcher = connection.playFile(filePath.toString());

        dispatcher.on('start', () => {
            console.log('Reproduciendo ' + filePath);
        });

        return new Promise((resolve, reject) => {           
            dispatcher.on('end', () => {
                if (shouldDisconnect){
                    setTimeout(disconectFromVoiceChannel, 1000, connection)       
                }
                resolve();
            });
        });

        function disconectFromVoiceChannel(connection){
            connection.disconnect();
        }
    },         
};