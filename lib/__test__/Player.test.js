



const Potion = require('../Potion');

jest.mock('../Potion');

console.log(new Potion());

const Player = require('../player');


test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );

});


test('gets the players stats as an object', () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
})

test('gets inventory from the player or returns false', () => {
    // which person we are looking at, either enemy or player, this case, player
    const player = new Player('Dave'); 
    // grabs the inventory object which is an array
    expect(player.getInventory()).toEqual(expect.any(Array));
    // this is for when you have an empty array, then it'll return false, as shown below
    player.inventory = [];
    // if there is nothing in the array
    expect(player.getInventory()).toEqual(false);
});