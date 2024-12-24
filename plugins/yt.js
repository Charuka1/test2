const config = require('../config')
const l = console.log
const { cmd, commands } = require('../command')
const dl = require('@bochilteam/scraper')  
const ytdl = require('youtubedl-core');
const api = require("caliph-api");
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
function ytreg(url) {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    return ytIdRegex.test(url);
}
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, getsize} = require('../lib/functions')
const dl2 = require('inrl-dl')
var descv =''
if(config.LANG === 'SI') descv = "Youtube වෙතින් videos බාගත කරයි."
else descv = "Download videos from Youtube."

var descs =''
if(config.LANG === 'SI') descs = "Youtube වෙතින් songs බාගත කරයි."
else descs = "Download songs from Youtube."

var descyt =''
if(config.LANG === 'SI') descyt = "Youtube වෙතින් video සහ songs බාගත කරයි."
else descyt = "Download videos and songs from Youtube."

var descsh =''
if(config.LANG === 'SI') descsh = "Youtube search බාගත කරයි."
else descsh = "Search and get details from youtube."

var N_FOUND =''
if(config.LANG === 'SI') N_FOUND = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else N_FOUND = "*I couldn't find anything :(*"

var urlneed =''
if(config.LANG === 'SI') urlneed = "*කරුණාකර Youtube url එකක් ලබා දෙන්න*"
else urlneed = "*Please give me youtube url..*"

var imgmsg =''
if(config.LANG === 'SI') imgmsg = "```කරුණාකර වචන කිහිපයක් ලියන්න!```"
else imgmsg = "```Please write a few words!```"

var sizetoo =''
if(config.LANG === 'SI') sizetoo = "_This file size is too big_\n ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​  *මෙම file එක upload කිරීමට මෙම bot host වෙන platform එකේ bandwith එක ප්‍රමානවත් නැත !*"
else sizetoo =  "_This file size is too big_\n​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ *The bandwidth of the platform where this bot is hosted is not enough to upload this file!*"

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts lelena',
    react: "🔎",
    desc: descsh,
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
try {
let yts = require("yt-search")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from , { text:  mesaj }, { quoted: mek } )
} catch (e) {
    l(e)
  reply('*Error !!*')
}
})

cmd({
    pattern: "yt",
    alias: ["play"],
    use: '.yt lelena',
    react: "📽️",
    desc: descyt,
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
if(isUrl(q) && q.includes('/shorts')){let dat = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

  *SELECT TYPE*`
const buttons = [
  {buttonId: prefix + 'selectaud ' + q, buttonText: {displayText: 'SONG'}, type: 1},
  {buttonId: prefix + 'selectvid ' + q, buttonText: {displayText: 'VIDEO'}, type: 1}
]
const buttonMessage = {
    caption: dat,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 1
}
return await conn.buttonMessage(from, buttonMessage, mek)}
if(ytreg(q)){let dat = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

*SELECT SONG TYPE*`
const buttons = [
{buttonId: prefix + 'ytdoc ' + q, buttonText: {displayText: 'DOCUMENT SONG'}, type: 1},
{buttonId: prefix + 'ytmp3 ' + q, buttonText: {displayText: 'AUDIO SONG'}, type: 1}
]
const buttonMessage = {
 caption: dat,
 footer: config.FOOTER,
 buttons: buttons,
 headerType: 1
}
return await conn.buttonMessage(from, buttonMessage, mek)}
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

   *YT DOWNLOADER*

*📃 Title:* ${anu.title}

*📺 Views:* ${anu.views}

*🕹️ Duration:* ${anu.timestamp}

*🔗 Url:* ${anu.url}`
const buttons = [
  {buttonId: prefix + 'selectaud ' + anu.url, buttonText: {displayText: 'SONG'}, type: 1},
  {buttonId: prefix + 'selectvid ' + anu.url, buttonText: {displayText: 'VIDEO'}, type: 1}
]
const buttonMessage = {
    image: {url: anu.thumbnail},
    caption: cap,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage)
} catch (e) {
  reply(N_FOUND)
  l(e)
}
})

cmd({
    pattern: "video",
    alias: ["ytvideo"],
    use: '.video lelena',
    react: "📽️",
    desc: descv,
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
if(isUrl(q) && q.includes('/shorts')){let dat = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

   *SELECT VIDEO TYPE*`
const buttons = [
  {buttonId: prefix + '360p ' + q, buttonText: {displayText: '360p VIDEO'}, type: 1},
  {buttonId: prefix + '720p ' + q, buttonText: {displayText: '720p VIDEO'}, type: 1}
]
const buttonMessage = {
    caption: dat,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 1
}
return await conn.buttonMessage(from, buttonMessage, mek)}
if(ytreg(q)){let dat = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

*SELECT VIDEO TYPE*`
const buttons = [
{buttonId: prefix + '360p ' + q, buttonText: {displayText: '360p SONG'}, type: 1},
{buttonId: prefix + '720p ' + q, buttonText: {displayText: '720p SONG'}, type: 1}
]
const buttonMessage = {
 caption: dat,
 footer: config.FOOTER,
 buttons: buttons,
 headerType: 1
}
return await conn.buttonMessage(from, buttonMessage, mek)}
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

   *VIDEO DOWNLOADER*

*📃 Title:* ${anu.title}

*📺 Views:* ${anu.views}

*🕹️ Duration:* ${anu.timestamp}

*🔗 Url:* ${anu.url}`
const buttons = [
  {buttonId: prefix + '360p ' + anu.url, buttonText: {displayText: '360p VIDEO'}, type: 1},
  {buttonId: prefix + '720p ' + anu.url, buttonText: {displayText: '720p VIDEO'}, type: 1}
]
const buttonMessage = {
    image: {url: anu.thumbnail},
    caption: cap,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply(N_FOUND)
  l(e)
}
})

cmd({
    pattern: "song",
    alias: ["ytsong"],
    use: '.song lelena',
    react: "🎧",
    desc: descs,
    category: "download",
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
if(isUrl(q) && q.includes('/shorts')){let dat = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

   *SELECT SONG TYPE*`
const buttons = [
{buttonId: prefix + 'ytdoc ' + q, buttonText: {displayText: 'DOCUMENT SONG'}, type: 1},
{buttonId: prefix + 'ytmp3 ' + q, buttonText: {displayText: 'AUDIO SONG'}, type: 1}
]
const buttonMessage = {
    caption: dat,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 1
}
return await conn.buttonMessage(from, buttonMessage, mek)}
if(ytreg(q)){let dat = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

*SELECT SONG TYPE*`
const buttons = [
{buttonId: prefix + 'ytdoc ' + q, buttonText: {displayText: 'DOCUMENT SONG'}, type: 1},
{buttonId: prefix + 'ytmp3 ' + q, buttonText: {displayText: 'AUDIO SONG'}, type: 1}
]
const buttonMessage = {
 caption: dat,
 footer: config.FOOTER,
 buttons: buttons,
 headerType: 1
}
return await conn.buttonMessage(from, buttonMessage, mek)}
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

   *SONG DOWNLOADER*

*📃 Title:* ${anu.title}

*📺 Views:* ${anu.views}

*🕹️ Duration:* ${anu.timestamp}

*🔗 Url:* ${anu.url}`
const buttons = [
  {buttonId: prefix + 'ytdoc ' + anu.url, buttonText: {displayText: 'DOCUMENT SONG'}, type: 1},
  {buttonId: prefix + 'ytmp3 ' + anu.url, buttonText: {displayText: 'AUDIO SONG'}, type: 1}
]
const buttonMessage = {
    image: {url: anu.thumbnail},
    caption: cap,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply(N_FOUND)
  l(e)
}
})

cmd({
  alias: ["selectaud"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

  *SELECT SONG TYPE*`
const buttons = [
  {buttonId: prefix + 'ytdoc ' + q, buttonText: {displayText: 'DOCUMENT SONG'}, type: 1},
  {buttonId: prefix + 'ytmp3 ' + q, buttonText: {displayText: 'AUDIO SONG'}, type: 1}
]
  const buttonMessage = {
      caption: dat,
      footer: config.FOOTER,
      buttons: buttons,
      headerType: 1
  }
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply(N_FOUND)
l(e)
}
})


cmd({
  alias: ["selectvid"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `┌───[ 🧚𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗🧚 ]

  *SELECT VIDEO QUALITY*`
const buttons = [
  {buttonId: prefix + '360p ' + q, buttonText: {displayText: '360p VIDEO'}, type: 1},
  {buttonId: prefix + '720p ' + q, buttonText: {displayText: '720p VIDEO'}, type: 1}
]
  const buttonMessage = {
      caption: dat,
      footer: config.FOOTER,
      buttons: buttons,
      headerType: 1
  }
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply(N_FOUND)
l(e)
}
})


//===================================================================================================

cmd({
  pattern: "360p",
  use: '.360p <video url>',
  react: "📽️",
  desc: "Download yt videos.",
  category: "download",
  filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['360p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { video: {url: await yt.video['360p'].download() },caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})

cmd({
    pattern: "720p",
    use: '.720p <video url>',
    react: "📽️",
    desc: "Download yt videos.",
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const yt2 = await  dl.youtubedl(q)
let yt = yt2
let size = await getsize(await yt.video['720p'].download())
if (size.includes('MB') && size.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
if (size.includes('GB')) return await conn.sendMessage(from, { text: sizetoo }, { quoted: mek });
let senda = await conn.sendMessage(from, { video: {url: await yt.video['720p'].download() },caption: config.FOOTER}, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '🎥', key: senda.key }})
} catch (e) {
reply(N_FOUND)
l(e)
}
})


cmd({
  pattern: "ytmp3",
  use: '.ytmp3 <yt url>',
  react: "🎧",
  desc: "Download yt song.",
  category: "download",
  filename: __filename
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
let infoYt = await ytdl.getInfo(q);
if (infoYt.videoDetails.lengthSeconds >= videotime) {
  reply(sizetoo);
  return;
}
let titleYt = infoYt.videoDetails.title;
let randomName = getRandom(".mp3");
const stream = ytdl(q, {
      filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
  })
  .pipe(fs.createWriteStream(`./${randomName}`));
await new Promise((resolve, reject) => {
  stream.on("error", reject);
  stream.on("finish", resolve);
});

let stats = fs.statSync(`./${randomName}`);
let fileSizeInBytes = stats.size;
let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
if (fileSizeInMegabytes <= config.MAX_SIZE) {
let sendaE =  await conn.sendMessage(from, { audio: fs.readFileSync(`./${randomName}`), mimetype: 'audio/mpeg', fileName:  `${titleYt}.mp3` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '🎼', key: sendaE.key }})
return fs.unlinkSync(`./${randomName}`);
} else {
reply(sizetoo)
}
fs.unlinkSync(`./${randomName}`);
} catch (e) {
reply(N_FOUND)
l(e)
}
})

cmd({
  pattern: "ytdoc",
  use: '.ytdoc <yt url>',
  react: "🎧",
  desc: "Download yt song.",
  category: "download",
  filename: __filename
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
let infoYt = await ytdl.getInfo(q);
if (infoYt.videoDetails.lengthSeconds >= videotime) {
  reply(sizetoo);
  return;
}
let titleYt = infoYt.videoDetails.title;
let randomName = getRandom(".mp3");
const stream = ytdl(q, {
      filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
  })
  .pipe(fs.createWriteStream(`./${randomName}`));
await new Promise((resolve, reject) => {
  stream.on("error", reject);
  stream.on("finish", resolve);
});

let stats = fs.statSync(`./${randomName}`);
let fileSizeInBytes = stats.size;
let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
if (fileSizeInMegabytes <= config.MAX_SIZE) {
  let senda =  await conn.sendMessage(from, { document: fs.readFileSync(`./${randomName}`), mimetype: 'audio/mpeg', fileName: titleYt + '.mp3',caption: config.FOOTER  }, { quoted: mek })
  await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
return fs.unlinkSync(`./${randomName}`);
} else {
reply(sizetoo);
}
fs.unlinkSync(`./${randomName}`);
} catch (e) {
reply(N_FOUND)
l(e)
}
})
