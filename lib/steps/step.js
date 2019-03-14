const { defineStep, Before } = require('cucumber')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const RequestJ = require('../support/RequestJ')
const ResponseJ = require('../support/ResponseJ')
const axios = require('axios')

chai.use(chaiAsPromised);
var expect = chai.expect;

Before(function(){
    this.requestJ = new RequestJ();
    this.responseJ = new ResponseJ();
    this.requestJ.addBaseUrl(`http://130.211.103.134:4000/api/v1`);
});

defineStep('I add the path {string}', function (string) {
    this.requestJ.addPath(string);
});

defineStep('I set the body', function (docString) {
    this.requestJ.addBody(docString);
});

defineStep('I use the method {string}', function (string) {
    this.requestJ.setMethod(string);
});

defineStep('the response code is {int}', function (number) {
    const responseCode = this.responseJ.getStatus();
     console.log(JSON.stringify(this.responseJ));
     expect(responseCode == number).to.be.ok;
});

defineStep('the response contains {string}', function (string) {
    let value = eachRecursive(this.responseJ.data,string);
    expect(value).to.be.true;
});

function eachRecursive(obj, wanted, alreadyFound = false){
    let found = alreadyFound;
    for (var k in obj)
    {
        if (typeof obj[k] == "object" && obj[k] !== null){
            found = eachRecursive(obj[k], wanted, found);
            if(found){
                break;
            }
        }else{
            if (obj[k] == wanted){
                return true;
            }
        }
    }
    return found;
}

defineStep('I send the request', {timeout: 10 * 5000}, async function () {
    var self = this;
    try {
        const response = await axios({
            baseURL: this.requestJ.baseURL,
            method: this.requestJ.method,
            url: this.requestJ.url,
            data: this.requestJ.data,
            params: this.requestJ.params,
            headers: this.requestJ.headers
        });
        console.log(response);
        self.responseJ.setData(response.data);
        self.responseJ.setStatus(response.status);
        self.responseJ.setStatusText(response.statusText);
        self.responseJ.setConfig(response.config);
        
    } catch (error) {
        self.responseJ.setData(error.response.data);
        self.responseJ.setStatus(error.response.status);
        self.responseJ.setStatusText(error.response.statusText);
        self.responseJ.setConfig(error.response.config);
        console.error(error);
    }

});
