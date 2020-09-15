module.exports = {     
    play: async function(filePath, connection){ 
        let dispatcher = connection.playFile(filePath.toString());
        dispatcher.on('start', () => {
            console.log('Reproduciendo ' + filePath);
        });

        dispatcher.on('end', () => {
            setTimeout(connection.disconnect(),2000);
        });
    },         
};