const fs = require('fs');
const textToSpeech = require('@google-cloud/text-to-speech');
var FfmpegCommand = require('fluent-ffmpeg');

var pid = JSON.parse(fs.readFileSync("./googleapi.json")).project_id

const clientz = new textToSpeech.TextToSpeechClient({
    projectId: pid,
    keyFilename: './googleapi.json'
});

module.exports = {
    name: "Text To Speech",
    alias: ['tts'],
    helptext: "Uses google api's to run text to speech stuffs",
    helphide: false,
    permissions: ['READ_MESSAGES'],
    args: ['message'],
    category: 'general',
    command: (client, msg) => {
        if (msg.suffix == "" || msg.suffix == undefined)
            return;

        const text = msg.suffix;

        // Construct the request
        const request = {
            input: { text: text },
            // Select the language and SSML Voice Gender (optional)
            voice: { name: 'en-US-Wavenet-D', languageCode: 'en-US' },
            // Select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3', speakingRate: '0.85' },
        };

        // Performs the Text-to-Speech request
        clientz.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error('ERROR:', err);
                return;
            }



            // Write the binary audio content to a local file
            fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
                if (err) {
                    console.error('ERROR:', err);
                    return;
                }

                var command = FfmpegCommand('./output.mp3').addInput('./1SecSilence.mp3')
                    .on('error', function (err) {
                        console.log('An error occurred: ' + err.message);
                    })
                    .on('end', function () {
                        msg.member.voiceChannel.join()
                            .then(connection => {
                                const dispatcher = connection.playFile('./merged.mp3');

                                dispatcher.on('end', () => {
                                    const timeoutObj = setTimeout(() => {
                                        const dispatcher = null;
                                        connection.disconnect();
                                    }, 60000)
                                });

                                dispatcher.on('error', error => {
                                    console.log(error)
                                });
                            })
                            .catch(console.error);
                    })
                    .mergeToFile('./merged.mp3', './tempDir');




                console.log('Audio content written to file: output.mp3');
            });
        });
    }
}
