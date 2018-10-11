var channel = require('../');
var fcore = require('fcash-lib');


var refundKey = new fcore.PrivateKey(fcore.Networks.testnet);
var fundingKey = new fcore.PrivateKey(fcore.Networks.testnet);
var commitmentKey = new fcore.PrivateKey(fcore.Networks.testnet);

console.log('funding key: ' + refundKey.toString());
console.log('refund key: ' + fundingKey.toString());
console.log('commitment key: ' + commitmentKey.toString());
