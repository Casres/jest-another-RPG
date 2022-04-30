const inquirer = require("inquirer");
const Enemy = require("./enemy");
const Player = require("./player");

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.enemies.push(new Enemy("goblin", "sword"));
  this.enemies.push(new Enemy("orc", "baseball bat"));
  this.enemies.push(new Enemy("skeleton", "axe"));
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function () {
  this.currentEnemy = this.enemies[0];

  // prompting the user a question as to what their character name is
  inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    // destructure name from the prompt object
    .then(({ name }) => {
      this.player = new Player(name);

      this.startNewBattle();
    });
};

// checks to see if the players agility is higher than the enemys agility
Game.prototype.startNewBattle = function () {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }

  console.log("Your players:");
  console.table(this.player.getStats());

  console.log("Enemy stats:");
  console.table(this.currentEnemy.getDescription());
  this.battle();
};

Game.prototype.battle = function () {
  if (this.isPlayerTurn) {
    // player prompts will go here
    inquirer
      .prompt({
        type: "list",
        name: "What would you like to do?",
        name: "action",
        choices: ["Attack", "Use potion"],
      })
      .then(({ action }) => {
        if (action === "Use potion") {
          if (!this.player.getInventory()) {
            console.log("inventory empty!!");
            return this.checkEndOfBattle();
          }
          inquirer
            .prompt({
              type: "list",
              message: "Which potion would you like to use?",
              name: "action",
              choices: this.player
                .getInventory()
                .map((item, index) => `${index + 1}: ${item.name}`),
            })
            .then(({ action }) => {
              const potionDetails = action.split(": ");

              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} potion.`);
              this.checkEndOfBattle();
            });
        } else {
          const damage = this.currentEnemy.getAttackValue();
          this.player.reduceHealth(damage);

          console.log(`You were attacked by the ${this.currentEnemy.name}`);
          console.log(this.player.getHealth());
          this.checkEndOfBattle();
        }
      });
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
    this.checkEndOfBattle();
  }
};

Game.prototype.checkEndOfBattle = function () {
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`You have defeated the ${this.currentEnemy.name}`);

    this.player.addPotion(this.currentEnemy.potion);
    console.log(
      `${this.player.name} found a ${this.currentEnemy.potion.name} potion`
    );

    this.roundNumber++;

    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log("You win!");
    }
  } else {
    console.log("You lost!");
  }
};

module.exports = Game;
