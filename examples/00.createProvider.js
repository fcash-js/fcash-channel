var channel = require('../');
var fcashBase = require('fcash-lib');


var providerKey = new fcashBase.PrivateKey(fcashBase.Networks.testnet);

console.log('provider key: ' + providerKey.toString());
