const Telegraf = require('telegraf');
const fs = require('fs');
const bot = new Telegraf(fs.readFileSync(__dirname+"\\apikey.txt").toString());
const axios = require('axios');
bot.start((message) => {
  console.log('started:', message.from.id)
  message.reply(saluto(message.from.first_name));
})
bot.on('text', message=> {
    var textchat = String(message.message.text.toLowerCase());
    var riserva = String(message.message.text);
    if(textchat.includes('ciao') || textchat.includes('buongiorno')){
        message.reply(saluto(message.from.first_name));
    }
    if(textchat.includes('barzellett') || textchat.includes('battut')){
        axios.post('https://barzellettebot5000.altervista.org/getTelegram.php?tipo=Barzelletta', {})
        .then(function (response) {
            if(textchat.includes('dedic')){
                textchat.replace('@barsellettebot','');
                if(textchat.includes('@')){
                    var name = riserva.substring(riserva.indexOf('@'));
                    if(name.indexOf(' ') > -1){
                        name = name.substring(0,name.indexOf(' '));
                    }
                    return message.reply(name+', questa barze è dedicata a te!\n'+response.data);
                }
            }
            return message.reply(response.data);
        })
        .catch(function (error) {
            console.log(error);
            return message.reply('Errore, contatta @lospezio');
        });
    }
    if(textchat.includes('random') || textchat.includes('casuale') || textchat.includes('5000')){
        axios.post('https://barzellettebot5000.altervista.org/getBarze.php', {})
        .then(function (response) {
            return message.reply(response.data);
        })
        .catch(function (error) {
            console.log(error);
            return message.reply('Errore, contatta @lospezio');
        });
    }
    if(textchat.includes('mark')){
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python',["markovBarze.py"]);
        pythonProcess.stdout.on('data', (data) => {
            return message.reply(data.toString());
        });
    }
    if(textchat.includes('update')){
        axios.post('https://barzellettebot5000.altervista.org/getAllBarze.php', {})
        .then(function (response) {
            txtfile = response.data.replace(/(\r\n|\n|\r)/gm,". ");
            fs.writeFileSync('fullBarze.txt', txtfile);
            const spawn = require("child_process").spawn;
            const pythonProcess = spawn('python',["updateMarkov.py"]);
            pythonProcess.stdout.on('data', (data) => {
                return message.reply(data.toString());
            });
        })
    }
    if(textchat.includes('insult')){
        axios.post('https://barzellettebot5000.altervista.org/getTelegram.php?tipo=Insulto', {})
        .then(function (response) {
            return message.reply(message.from.first_name + ' sei un ' + response.data);
        })
        .catch(function (error) {
            console.log(error);
            return message.reply('Errore, contatta @lospezio');
        });
    }
    if(textchat.includes('come va') || textchat.includes('come butta') || textchat.includes('come stai') || textchat.includes('tutto bene')){
        var greet;
        switch(generateRandomNumber(1,3)){
            case 1:
            greet= message.from.first_name + '... mi sto rotolando dalle risate!';
            break;
            case 2:
            greet= 'Tutto bene, '+ message.from.first_name +'! Il mio sorriso oggi è più splendente di ieri, tutto grazie alle mie battute! eheheh...';
            break;
            case 3:
            greet= 'Tutto bene, ' + message.from.first_name + ', a parte questo dolore agli addominali per le troppe risate!';
            break;
        }
        return message.reply(greet);
    }
});
bot.startPolling();

function generateRandomNumber(min , max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saluto (name){
    var welcome;
    switch(generateRandomNumber(1,3)){
        case 1:
        welcome= 'Ciao, ' + name + ', pronto a spaccarti dalle risate?';
        break;
        case 2:
        welcome= 'Ciao, ' + name + ', pronto a ridere a crepapelle?';
        break;
        case 3:
        welcome= 'Ciao, ' + name + ', preparati a ridere... a denti stretti!!!';
        break;
    }
    return welcome;
}