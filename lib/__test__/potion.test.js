



const Potion = require('../Potion.js');

test('creates a health potion object', () => {
  const potion = new Potion('health');

  expect(potion.name).toEqual(expect.any(String));
  expect(potion.value).toEqual(expect.any(Number));
  expect(potion.name.length).toBeGreaterThan(0);
});