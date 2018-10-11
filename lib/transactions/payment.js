'use strict';

var inherits = require('inherits');

var Address = require('fcash-lib').Address;
var Transaction = require('fcash-lib').Transaction;
var PublicKey = require('fcash-lib').Publickey;
var $ = require('fcash-lib').util.preconditions;
var _ = require('fcash-lib').deps._;

var FEE_AMOUNT = 10000;


/**
 * @constructor
 * @param {Object} opts
 * @param {fcore.PublicKey} opts.publicKeys
 * @param {fcore.Address} opts.paymentAddress
 * @param {fcore.Address} opts.changeAddress
 */
function Payment(opts) {
  if (!(this instanceof Payment)) {
    return new Payment(opts);
  }
  Transaction.call(this, opts.transaction);

  this.paymentAddress = new Address(opts.paymentAddress);
  this.changeAddress = new Address(opts.changeAddress);
  if (!this.outputs.length) {
    this.change(this.changeAddress);
  }

  this.multisigOut = new Transaction.UnspentOutput(opts.multisigOut);
  this.publicKeys = _.map(opts.publicKeys, PublicKey);
  if (!this.inputs.length) {
    this.from(this.multisigOut, this.publicKeys, 2);
  }
  this.amount = this.outputAmount;
  this.sequence = opts.sequence || 0;
  this.paid = opts.paid || 0;
  $.checkArgument(_.isNumber(this.amount), 'Amount must be a number');
}
inherits(Payment, Transaction);

Payment.prototype._updateTransaction = function() {
  this.clearOutputs();
  this.to(this.paymentAddress, this.paid);
  this.inputs[0].sequence = this.sequence;
};

Payment.prototype.updateValue = function(delta) {
  this.paid += delta;
  this.sequence += 1;
  this._updateTransaction();
  return this;
};

Payment.prototype.toObject = function() {
  return {
    publicKeys: _.map(this.publicKeys, function(publicKey) {
      return publicKey.toString();
    }),
    multisigOut: this.multisigOut.toObject(),
    amount: this.amount,
    sequence: this.sequence,
    paymentAddress: this.paymentAddress.toString(),
    changeAddress: this.changeAddress.toString(),
    transaction: Transaction.prototype.toObject.apply(this)
  };
};

Payment.fromObject = function(obj) {
  return new Payment(obj);
};

module.exports = Payment;
