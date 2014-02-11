var fs = require('fs')
var testdir = __dirname + '/test'

fs.readdirSync(testdir).forEach(function(name) {
  require('./test/'+name)
})
