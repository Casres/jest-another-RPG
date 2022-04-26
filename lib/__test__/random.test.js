



const checkIfEqual = require('../__test__/random.test.js');

TextDecoderStream('checks if 10 is equal to 10', () => {
    expect(checkIfEqual(10,10)).toBe(true);
});