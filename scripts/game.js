//----------PLAYER-BOX-DOM--------------------------------------------------------------------------------------------------

let playerName = document.getElementById('playerName')
let playerHealth = document.getElementById('playerCurrentHealth')
let playerMaxhealth = document.getElementById('playerMaxHealth')
let playerSTR = document.getElementById('playerStrength')
let playerDEF = document.getElementById('playerDefense')


//--------------------------------------------------------------------------------------------------------------------------

//----------ENEMY-BOX-DOM---------------------------------------------------------------------------------------------------

let enemyName = document.getElementById('enemyName')
let enemyHealth = document.getElementById('enemyCurrentHealth')
let enemyMaxhealth = document.getElementById('enemyMaxHealth')
let enemySTR = document.getElementById('enemyStrength')
let enemyDEF = document.getElementById('enemyDefense')

//--------------------------------------------------------------------------------------------------------------------------

//----------Buttons-DOM-----------------------------------------------------------------------------------------------------

let btnFire = document.querySelector('#btnFire')
let btnLeaf = document.querySelector('#btnLeaf')
let btnRock = document.querySelector('#btnRock')


//--------------------------------------------------------------------------------------------------------------------------

//-----------MONSTERS-ARRAY-------------------------------------------------------------------------------------------------

const monstersArray = [
    ['Green Ninja', '/charactersMedia/greenTeam/GreenNinja/Faceset.png', 22, 6, 2],
    ['Yellow Ninja', '/charactersMedia/yellowTeam/Yellowknight/Faceset.png', 30, 12, 2],
    ['Red Ninja', '/charactersMedia/redTeam/RedNinja2/Faceset.png', 48, 4, 8]
]

let typeMatch = {
    'Green Ninja': [['leaf'], ['fire'], ['earth']],
    'Yellow Ninja': [['earth'], ['fire'], ['leaf']],
    'Red Ninja': [['fire'], ['earth'], ['leaf']]
}

//--------------------------------------------------------------------------------------------------------------------------

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

function spawn() {
    let enemy = monstersArray[Math.floor(Math.random() * monstersArray.length)]
    let ninjaEnemy = new Ninja(enemy[0], enemy[1], enemy[2], enemy[3], enemy[4],)

    enemyName.innerHTML = ninjaEnemy.name
    enemyHealth.innerHTML = ninjaEnemy.health
    enemyMaxhealth.innerHTML = ninjaEnemy.health
    enemySTR.innerHTML = ninjaEnemy.strength
    enemyDEF.innerHTML = ninjaEnemy.defence

    return ninjaEnemy
}

function attack(str, def, attacker, receiver, health, owner) {

}

function checkWinner(health) {

}

btnFire.addEventListener('click', spawn)
btnLeaf.addEventListener('click', attack)
btnEarth.addEventListener('click', attack)