class Ninja {
    constructor(name, sprite, health, strength, defence) {
        this.name = name;
        this.sprite = sprite;
        this.health = health;
        this.fullHealth = health
        this.strength = strength;
        this.defence = defence
    }
}


const monstersArray = [
    ['Green Ninja', url = '/charactersMedia/greenTeam/GreenNinja/Faceset.png', 22, 6, 2],
    ['Yellow Ninja', url = '/charactersMedia/yellowTeam/Yellowknight/Faceset.png', 30, 12, 2],
    ['Red Ninja', url = '/charactersMedia/redTeam/RedNinja2/Faceset.png', 48, 4, 8]
]

let typeMatch = {
    'Green Ninja': [['leaf'],['fire'],['rock']],
    'Yellow Ninja': [['rock'],['fire'],['leaf']],
    'Red Ninja': [['fire'],['rock'],['leaf']]
}

function spawn(boolArg) {

}

function attack(str, def, attacker, receiver, health, owner) {

}

function checkWinner(health) {

}