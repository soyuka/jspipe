'use strict'
const Transform = require('stream').Transform
const vm = require('vm')
const util = require('util')

function JsPipe(locals, options) {
  if (!(this instanceof JsPipe))
    return new JsPipe(locals, options)

  if(!options)
    options = {}

  this.locals = locals
  this.variable = options.variable || '__'
  this._javascript = []

  Transform.call(this, options)
}

util.inherits(JsPipe, Transform)

JsPipe.prototype._transform = function(chunk, encoding, done) {
  this._javascript.push(chunk)
  done()
}

JsPipe.prototype._flush = function(done) {
  let sandbox = util._extend({}, this.locals)

  vm.runInNewContext(Buffer.concat(this._javascript).toString(), sandbox)

  this.push(sandbox[this.variable])

  done()
}
module.exports = JsPipe

