const readconfig = require('./readconfig')

test('find config file', () => {
  expect(readconfig()).toBe(true)
});