var channel = require('../');
var fcore = require('fcash-lib');


var providerKey = new fcore.PrivateKey(fcore.Networks.testnet);

console.log('provider key: ' + providerKey.toString());
