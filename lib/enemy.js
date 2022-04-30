



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

Enemy.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    } 
    return true;
};

Enemy.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

Enemy.prototype.reduceHealth = function(health) {
    this.health -= health;

    if(this.health < 0) {
        this.health = 0;
    }
};


module.exports = Enemy;