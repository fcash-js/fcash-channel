var channel = require('../');
var fcashBase = require('fcash-lib');


var refundKey = new fcashBase.PrivateKey(fcashBase.Networks.testnet);
var fundingKey = new fcashBase.PrivateKey(fcashBase.Networks.testnet);
var commitmentKey = new fcashBase.PrivateKey(fcashBase.Networks.testnet);

console.log('funding key: ' + refundKey.toString());
console.log('refund key: ' + fundingKey.toString());
console.log('commitment key: ' + commitmentKey.toString());
