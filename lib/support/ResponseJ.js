function ResponseJ(){
  this.data = {};
  this.status = '';
  this.statusText = '';
  this.config = {};
}

ResponseJ.prototype.setData = function (value) {
  this.data = value;
}

ResponseJ.prototype.getData = function () {
  return this.data;
}

ResponseJ.prototype.setStatus = function (value) {
  this.status = value;
}

ResponseJ.prototype.getStatus = function () {
  return this.status;
}

ResponseJ.prototype.setStatusText = function (value) {
  this.statusText = value;
}

ResponseJ.prototype.getStatusText = function () {
  return this.statusText;
}

ResponseJ.prototype.setConfig = function (value) {
  this.config = value;
}

ResponseJ.prototype.getConfig = function () {
   return this.config;
}

module.exports = ResponseJ;