



const Potion = require('../Potion');

jest.mock('../Potion');

console.log(new Potion());

const Player = require('../player');

// player stats
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

// what is says in the green
test('gets the players stats as an object', () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
})

// what it says in the green
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

test('gets players health value', () => {
    const player = new Player('Dave'); 

    expect(player.getHealth())
    .toEqual(expect.stringContaining(player.health.toString()));
});

test('Checks to see if the player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test('Subtracts health from the player', () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
    
    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

test('gets players attack value', () => {
    const player = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()). toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()). toBeLessThanOrEqual(15);
});

test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThanOrEqual(oldCount);
});

test('uses a potion from the players inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThanOrEqual(oldCount);
});
