require('dotenv').config();
var restify = require('restify');
var builder = require('botbuilder');
var https = require('https');
var querystring = require('querystring');
var prompts = require('./prompts');
//Intégration avec Luis :
// var model = process.env.LUIS_MODEL;
// var recognizer = new builder.LuisRecognizer(model);
// var dialog = new builder.IntentDialog({recognizers: [recognizer]});

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PWD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World");
});


//Swith case dialogs
// bot.dialog('/', new builder.IntentDialog()
//     .matches(/^add/i, '/addTask')
//     .matches(/^change/i, '/changeTask')
//     .matches(/^delete/i, '/deleteTask')
//     .onDefault(builder.DialogAction.send("I'm sorry. I didn't understand.")));




