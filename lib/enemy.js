


const Character = require('./Character');
const Potion = require('./potion');

class Enemy extends Character{
    constructor (name, weapon) {
        // calls the parent constructor, which in this case is the character constructor
        super(name);

        this.weapon = weapon;
        this.potion = new Potion();
    };

    // when the game is initialized, the enemys name and weapon is verbally displayed in the terminal to the user
    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    };
}

module.exports = Enemy;

// function Enemy(name, weapon) {
//     this.name = name;
//     this.weapon = weapon;
//     this.potion = new potion();

//     this.strength = Math.floor(Math.random() * 10 + 45);
//     this.agility = Math.floor(Math.random() * 5 + 5);
//     this.health = Math.floor(Math.random() * 5 + 5); 
// };

// Enemy.prototype = Object.create(Character.prototype);

// // when the game is initialized, the enemys name and weapon is verbally displayed in the terminal to the user
// Enemy.prototype.getDescription = function() {
//     return `A ${this.name} holding a ${this.weapon} has appeared!`;
// };

