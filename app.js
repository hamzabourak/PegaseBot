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
  
//Create chat bot
var connector = new builder.ChatConnector({
    appId: 'f252e82e-f9e7-4560-8c90-efa47bd5fa55',
    appPassword: 'daSuXrGE1PtRdvLP0HWVvEd'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================


bot.dialog('/', [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);


bot.dialog('/profile', [
    function (session) {
        builder.Prompts.choice(session, "Which color?", "red|green|blue");
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);



