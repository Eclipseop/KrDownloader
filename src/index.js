const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const readLine = require('readline');
const client = new textToSpeech.TextToSpeechClient();

const generateTTS = async (text) => {
    const request = {
        input: { text: text },
        voice: { languageCode: 'ko-KR', ssmlGender: 'MALE', name: "ko-KR-Wavenet-C" },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9 },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`tts_${text}.mp3`, response.audioContent, 'binary');
}

const test = () => {
    const lineReader = readLine.createInterface({
        input: fs.createReadStream('./data.txt')
    });

    lineReader.on('line', line => {
        generateTTS(line)
    });
}
test();