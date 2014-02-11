var parse = require('css-parse')
var rework = require('rework')
var test = require('tape')
var fs = require('fs')

var wrap = require('../')

var fixture = fs.readFileSync(
  __dirname + '/../fixtures/standalone-amperstand.css'
).toString()

test('standalone-amperstand', function(t) {
  var parsed = parse(".hello { world: 'lorem' }")
  var processed = parse(
    rework(fixture)
      .use(wrap())
      .toString()
  )

  t.deepEqual(
      parsed
    , processed
    , 'remove @document wrap(&){}'
  )

  t.end()
})
