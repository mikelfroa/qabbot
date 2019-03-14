# QAbify Challenge 2018

Ordering a cab using slack

In order to execute it you need to add
- conversationId = the Id of the slack channel
- slack_token =  the xoxb token of the bot


      $ npm install
      $ node app.js

## Commands

### Greet the bot
Let the user know that the qabbot is available and let him start the interaction having random greeting answers:

    $ hi qabbot

### Ask for a cab
The user writes his need for a cab. We accept all the phrases that includes the word 'cab':

    $ I want to order a cab
    $ I would like to have a cab
    $ Get me a cab


### Ask for the location

The user is asked for sharing his location. We accept all the phrases that include the next format (lon: X lat: Y)

    $ lon: X lat: Y
    $ I am located at lon:X lat:Y

## Test Suite
I have added tests in BDD format using Cucumberjs: https://github.com/cucumber/cucumber-js

All the scenarios are stored in features folder, and the steps are stored in the lib folder.

### Launch the test
Through command line:

    $ ./node_modules/.bin/cucumber-js --require lib -f json:cucumber_report.json

### Open the reports
Through command line:

    $ node reports.js