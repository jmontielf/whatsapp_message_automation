# Basic WhatsApp Message Automator 🤖
![Version](https://img.shields.io/badge/version-1.0.0-purple.svg?cacheSeconds=2592000)

> Light version of a automation with whatsapp-web.js for send messages with crontab to a certain person.
Project developed in JavaScript with NodeJS

# Dependencies
This project uses the following technologies and dependencies:
- [NodeJS v8+](https://nodejs.org/)
- [WhatsApp-Web.JS](https://github.com/pedroslopez/whatsapp-web.js)
- [QRCode Terminal](https://github.com/gtanner/qrcode-terminal)
- [Node Schedule](https://github.com/node-schedule/node-schedule)

## Setting up the bot
Clone the Repository
```bash
git clone https://github.com/jmontielf/whatsapp_message_automation
cd whatsapp_message_automation
```

Create a .env file inside the repo folder and write the recipient's number and your schedule time

RECIPIENT (.env.RECIPIENT), you need to update the number replacing CC with the country code and the X's with the number you want to send the message
Cron Configuration (.env.TIME), you need to replace * with the desired value in the .env file
                                ┌───────────── minute (0 - 59)
                                │ ┌───────────── hour (0 - 23)
                                │ │ ┌───────────── day of the month (1 - 31)
                                │ │ │ ┌───────────── month (1 - 12)
                                │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
                                │ │ │ │ │
                                │ │ │ │ │  

```bash
touch example.env
RECIPIENT="+CCXXXXXXXX"
TIME="* * * * *"
```

Install dependecies and start the script using

```bash
npm i && node index.js
```
After that a QR code will appear in the console, you need to read that QR with WhatsApp in your mobile and that's it!

## Author
👤 -- Julio Montiel --
- Github: [@jmontielf](https://github.com/jmontielf)