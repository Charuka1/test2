const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}


module.exports = {
SESSION_ID : process.env.SESSION_ID === undefined ? 'IZUMI-MD=3Foz3YQR#PSifJqC4hDV40vN_wlrVRJgbkwgbtIQ3klN-mHX5U2Y' : process.env.SESSION_ID ,
GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN === undefined ? "JrdWz7X7JpkZs2YDhZ5ZVzyki6x5ZJ1Jkx4A" : process.env.GITHUB_AUTH_TOKEN,
GITHUB_USERNAME: process.env.GITHUB_USERNAME === undefined ? "charuka1" : process.env.GITHUB_USERNAME,
BOT_NUMBER: process.env.BOT_NUMBER === undefined ? "94775228949" : process.env.BOT_NUMBER,
};
