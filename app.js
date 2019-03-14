const { RTMClient } = require('@slack/client');
const axios = require('axios')

const conversationId = ''; // Add the Id of the slack channel
const slack_token = ''; // Add the xoxb token of the bot

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(slack_token);
rtm.start();


rtm.on('message', (message) => {
  handleMessage(message);

  // Log the message
  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
});

function handleMessage(message) {
  if (message.text.includes("hi")) {
    sendGreeting();
  } else if (message.text.includes("cab")) {
    askForPosition();
  } else if (message.text.includes("lat") || (message.text.includes("lon"))) {
    getNearestCabs(message.text);
  }
}

//Manage to get the nearest cab available from the position introduce by the user
async function getNearestCabs(position) {
  let response;

  //Make a GET to the endpoint to get all the available cabs
  try {
    let uri = `http://130.211.103.134:4000/api/v1/taxis`;
    response = await axios({
      method: 'get',
      url: uri,
      withCredentials: true
    });
  } catch (error) {
    console.error(error);
  }

  //Manage the position introduce by the user
  var myRegexp_lon = /lon:\s*(\S+)/;
  var myRegexp_lat = /lat:\s*(\S+)/;
  var lon_patt = position.match(myRegexp_lon);
  var lat_patt = position.match(myRegexp_lat);
  let final_json = {};
  let values = [];

  for (var j = 0; j < response.data.length; j++){
    var lon = (response.data[j].location.lon);
    var lat = (response.data[j].location.lat);
    var c = Math.hypot(lon_patt[1]-lon, lat_patt[1]-lat);
    values.push(c);
    final_json[response.data[j].name] = c;

  }

  let nearest_cab_value = Math.min(...values);
  let nearest_cab;
  for (var key in final_json) {
    if (final_json[key] == nearest_cab_value){
      nearest_cab = key;
      console.log(key);
    }
  }

  //Make a POST to the endpoint to reserve the nearest cab in Madrid
  try {
    let uri = `http://130.211.103.134:4000/api/v1/taxis/Madrid/` + nearest_cab;
    response = await axios({
      method: 'post',
      url: uri,
      data: {
        "state": "hired"
      }
    });
  } catch (error) {
    console.error(error);
  }

  //Send a message to the user informing about the cab that have been reserve
  rtm.sendMessage('A ' + nearest_cab + ' have been requested for you', conversationId)
  .then((res) => {
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
}

//Ask the customer to introduce the lon and lat
async function askForPosition() {
  rtm.sendMessage('Please, share your lon and lat so we could send you the nearest cab (lon:x,lat:y)', conversationId)
  .then((res) => {
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
}

function sendGreeting() {
  var greeting = getGreeting();
  rtm.sendMessage(greeting, conversationId)
  .then((res) => {
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
}

function getGreeting() {
  var greetings = [
      "hello!",
      "hi there!",
      "cheerio!",
      "how do you do!",
      "¡hola!"
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}