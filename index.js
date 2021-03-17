/*
  Dependencies:
    - QRCode Terminal: This will print the generated QR from WhatsApp to the terminal
    - WhatsApp-Web: A client of whatsapp web in order to generate access, receive and send messages
    - fs: Will help to find and create a json file
*/
require("dotenv").config();
const fs = require("fs");
const qrcode = require("qrcode-terminal");
const schedule = require('node-schedule');
const { Client } = require("whatsapp-web.js");

// Environment & Global Variables
const recipient = process.env.RECIPIENT;
const scheduleTime = process.env.TIME;
let application_ready = false;

//TODO: Add more messages to send
const messages_list = [
  "Message 1",
  "Message 2",
  "Message 3",
  "Message 4",
  "Message 5",
  "Message 6",
];

//* Defines the route of the session file to be generated
const SESSION_FILE_PATH = "./session.json";

//* Load the session data if it has been previously saved (previous sessions)
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

//* Generate a instance of whatsapp web
const client = new Client({
  session: sessionData,
});

//* Generate the session and the QR code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

//* Saves a file with the current session in order to resume session
client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

//* If the authentication fail, throw an error
client.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessfull
  console.error("AUTHENTICATION FAILURE", msg);
});

//* Instance ready
client.on("ready", () => {
  console.log("Client is ready!");
  application_ready = true;
});

// TODO: Set rules to check when application is ready
schedule.scheduleJob(scheduleTime, () => {
  if(!application_ready){
    console.error("Application NOT ready, exit now");
    process.exit(1);
  }
  
  //* Generate a random number from 0 to the max of the messages
  const message_id = Math.floor(Math.random() * (messages_list.length - 0)) + 0;
  //* Getting chatId from the number.
  const chatId = recipient.substring(1) + "@c.us";
  //* Sending message.
  client.sendMessage(chatId, messages_list[message_id]);
  console.log("Message Sent!, ", messages_list[message_id])
})

//* Run the app
client.initialize();
