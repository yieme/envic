var envic = require('./index.js')

var expected = '{"ok":"here"}'
var test     = JSON.stringify(envic('Foo Bar'))

if (test != expected) {
  console.error('Expected: ', expected, ', encountered:', test)
  process.exit(1)
}
