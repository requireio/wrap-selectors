var parse = require('css-parse')
var rework = require('rework')
var test = require('tape')
var fs = require('fs')

var wrap = require('../')

var fixture = fs.readFileSync(
  __dirname + '/../fixtures/untouched.css'
).toString()

test('untouched', function(t) {
  var parsed = parse(fixture)
  var processed = parse(
    rework(fixture)
      .use(wrap())
      .toString()
  )

  t.deepEqual(
      parsed
    , processed
    , 'no syntatically significant changes were made'
  )

  t.end()
})
