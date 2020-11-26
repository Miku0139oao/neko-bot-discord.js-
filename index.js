const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs")
let prefix
let token
const request = require("request")
console.log(`All Right reserver Miku0139#0125 \n Created at 2020/11/26 23:36`)
async function connect(){
    client.login(token);
    client.on('ready', () => { //log when bot are ready
        console.log(`Logged in as ${client.user.tag}!`);
    });
    client.on('message',async function (msg){
        if(msg.author.bot||!msg.guild)return;
        const args = msg.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const command = args.shift().toLowerCase()
        if(msg.content.startsWith(prefix)) {
            if (command === `hneko`) {
                if (msg.channel.nsfw) {
                    hentai(msg, `hneko`)
                } else {
                    msg.channel.send(`${msg.author.tag}你只能在NSFW的頻道才能使用本指令`)
                }
            }
            if (command === `neko`) {
                if (msg.channel.nsfw) {
                    hentai(msg, `neko`)
                } else {
                    msg.channel.send(`${msg.author.tag}你只能在NSFW的頻道才能使用本指令`)
                }
            }
            if (command === `pussy`) {
                if (msg.channel.nsfw) {
                    hentai(msg, `pussy`)
                } else {
                    msg.channel.send(`${msg.author.tag}你只能在NSFW的頻道才能使用本指令`)
                }
            }
            if (command === `hentai`) {
                if (msg.channel.nsfw) {
                    hentai(msg, `hentai`)
                } else {
                    msg.channel.send(`${msg.author.tag}你只能在NSFW的頻道才能使用本指令`)
                }
            }
            if (command === `ass`) {
                if (msg.channel.nsfw) {
                    hentai(msg, `ass`)
                } else {
                    msg.channel.send(`${msg.author.tag}你只能在NSFW的頻道才能使用本指令`)
                }
            }
            if (command === `pgif`) {
                if (msg.channel.nsfw) {
                    hentai(msg, `pgif`)
                } else {
                    msg.channel.send(`${msg.author.tag}你只能在NSFW的頻道才能使用本指令`)
                }
            }
            if (command === `kanna`) {
                if (msg.channel.nsfw) {
                    hentai(msg, `kanna`)
                } else {
                    msg.channel.send(`${msg.author.tag}你只能在NSFW的頻道才能使用本指令`)
                }
            }
        }
    });
}
async function hentai(msg,type){ //request photo-api
    msg.delete()
   let url = `https://nekobot.xyz/api/image?type=${type}`
    const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`command: ${msg.content}`)
        .setTimestamp()
        .setFooter(`Request by ${msg.author.tag}`, `${msg.author.displayAvatarURL()}`);
    request(url, { json: true }, function(err, res, body) {
        if (typeof body === 'undefined')
            return console.log(err);
        if (body.error) {
            return console.log(body.error);
        }else {
        Embed.setImage(body.message)
            msg.channel.send(Embed)
            savephtots(body.message)
        }
    });
}
async function savephtots(img){ //download
    let ran = Math.floor(Math.random() * Math.floor(99999));
    let writeStream = fs.createWriteStream(`./photos/${ran}.jpg`)
    request(img).pipe(writeStream)
}
async function config(){
    let json
    fs.access(`./`, fs.R_OK | fs.W_OK, (_err) => { //檢查權限
        fs.exists(`./config.json`, function (exists) {
            if(exists){
                console.log(`config.json found!`)
                fs.readFile(`./config.json`, (_err, _data) => {
                    try {
                        json = JSON.parse(_data.toString())
                        prefix = json.prefix
                        token = json.token
                        connect()
                    } catch (_err) {
                        return  console.log(_err)
                    }
                })
            }else {
                console.log(`cannot find config.json , now generating a new one !`)
                let data = {
                    "prefix": "prefix",
                    "token": "yourdiscordbot's token"
                }
                data = JSON.stringify(data)
                fs.writeFileSync(`./config.json`, data, async function (err) {
                    if (err) return;
                })
                data =null;
            }
        })
    })
}
config()

