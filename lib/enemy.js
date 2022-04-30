



const potion = require('./potion');

function Enemy(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new potion();

    this.strength = Math.floor(Math.random() * 10 + 85);
    this.agility = Math.floor(Math.random() * 5 + 5);
    this.health = Math.floor(Math.random() * 5 + 5); 
};


// players name and health value/status
Enemy.prototype.getHealth = function () {
    return `The ${this.name}'s health is now ${this.health}!`;
};

// checks if the enemy is alive
Enemy.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    } 
    return true;
};

// gets the attack value of the enemy
Enemy.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

// this is much health they have left I presume??
Enemy.prototype.reduceHealth = function(health) {
    this.health -= health;

    if(this.health < 0) {
        this.health = 0;
    }
};

// when the game is initialized, the enemys name and weapon is verbally displayed in the terminal to the user
Enemy.prototype.getDescription = function() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
};

module.exports = Enemy;