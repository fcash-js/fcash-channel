'use strict';

var spec = {
  name: 'Channel',
  message: 'Internal Error on fcash-channels Module {0}',
};

module.exports = require('fcash-lib').errors.extend(spec);
