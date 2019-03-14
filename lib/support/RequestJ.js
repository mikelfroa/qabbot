function RequestJ(){
  this.baseURL = '';
  this.url = '';
  this.method = '';
  this.data = {};
  this.params = {};
}

RequestJ.prototype.addBaseUrl = function (value) {
  this.baseURL += value;
}

RequestJ.prototype.addPath = function (value) {
  this.url += '/' + value;
}

RequestJ.prototype.setMethod = function (value) {
  this.method = value;
}

RequestJ.prototype.addBody = function (value) {
  this.data = JSON.parse(value);
}

RequestJ.prototype.addParams = function (key,value) {
  this.params[ key ] = value;
}

module.exports = RequestJ;