const JsPipe = require('./index.js')
const stream = require('stream')
const s = new stream.Readable()
const jspipe = new JsPipe({world: 'world'});
const assert = require('assert')

s._read = function noop() {}
s.push('var __ = "hello " + world;')
s.push(null)

s
.pipe(jspipe)

jspipe.on('data', function(d) {
  assert(d.toString() === 'hello world')
})
