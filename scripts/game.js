
class Ninja {
    constructor(name, sprite, health, strength, defence, type) {
        this.name = name;
        this.sprite = sprite;
        this.health = health;
        this.fullHealth = health
        this.strength = strength;
        this.defence = defence
        this.type = type
    }
}

//----------PLAYER-BOX-DOM--------------------------------------------------------------------------------------------------

let playerName = document.getElementById('playerName')
let playerHealth = document.getElementById('playerCurrentHealth')
let playerMaxhealth = document.getElementById('playerMaxHealth')
let playerSTR = document.getElementById('playerStrength')
let playerDEF = document.getElementById('playerDefense')
let battleCommentary = document.getElementById('battleComment')


//--------------------------------------------------------------------------------------------------------------------------

//----------ENEMY-BOX-DOM---------------------------------------------------------------------------------------------------

let enemyName = document.getElementById('enemyName')
let enemyHealth = document.getElementById('enemyCurrentHealth')
let enemyMaxhealth = document.getElementById('enemyMaxHealth')
let enemySTR = document.getElementById('enemyStrength')
let enemyDEF = document.getElementById('enemyDefense')
let enemySprite = document.getElementById('enemyImg')

//--------------------------------------------------------------------------------------------------------------------------

//----------Buttons-DOM-----------------------------------------------------------------------------------------------------

let btnFire = document.querySelector('#btnFire')
let btnLeaf = document.querySelector('#btnLeaf')
let btnRock = document.querySelector('#btnRock')

function enableButtons() {

    btnFire.removeAttribute('disabled')
    btnLeaf.removeAttribute('disabled')
    btnWater.removeAttribute('disabled')
}

function disableButtons() {
    btnFire.setAttribute('disabled', true)
    btnLeaf.setAttribute('disabled', true)
    btnWater.setAttribute('disabled', true)
}

//--------------------------------------------------------------------------------------------------------------------------

//-----------MONSTERS-ARRAY-------------------------------------------------------------------------------------------------

const monstersArray = [
    ['Leaf Ninja', '/charactersMedia/GreenNinja/Faceset.png', 22, 8, 2, 'leaf'],
    ['Water Ninja', '/charactersMedia/BlueNinja/Faceset.png', 30, 6, 6, 'earth'],
    ['Fire Ninja', '/charactersMedia/RedNinja/Faceset.png', 30, 8, 2, 'fire']
]

//--------------------------------------------------------------------------------------------------------------------------

//---------PLAYER-SPAWN-----------------------------------------------------------------------------------------------------

const playerArray = [
    ['Black Ninja', '/charactersMedia/Player/DarkNinja/Faceset.png', 20, 20, 4]
]

let player = playerArray[0]
let ninjaPlayer = new Ninja(player[0], player[1], player[2], player[3], player[4])


playerName.innerHTML = ninjaPlayer.name
playerHealth.innerHTML = ninjaPlayer.health
playerMaxhealth.innerHTML = ninjaPlayer.health
playerSTR.innerHTML = ninjaPlayer.strength
playerDEF.innerHTML = ninjaPlayer.defence

playerName = ninjaPlayer.name
playerMaxhealth = ninjaPlayer.health
playerSTR = ninjaPlayer.strength
playerDEF = ninjaPlayer.defence

//--------------------------------------------------------------------------------------------------------------------------
//---------ENEMY-SPAWN/RESPAWN----------------------------------------------------------------------------------------------

function respawnEnemy() {
    spawnedNinjaEnemy = spawn()
    playerAttackDMG = playerSTR - spawnedNinjaEnemy.defence
    enemyAttackDamage = spawnedNinjaEnemy.strength - ninjaPlayer.defence

    return spawnedNinjaEnemy
}

function restorePlayerHealth() {
    ninjaPlayer.health = ninjaPlayer.fullHealth
    playerHealth.innerHTML = ninjaPlayer.health
}

function spawn() {
    let enemy = monstersArray[Math.floor(Math.random() * monstersArray.length)]
    let ninjaEnemy = new Ninja(enemy[0], enemy[1], enemy[2], enemy[3], enemy[4], enemy[5])

    enemySprite.setAttribute('src', ninjaEnemy.sprite)
    enemyName.innerHTML = ninjaEnemy.name
    enemyHealth.innerHTML = ninjaEnemy.health
    enemyMaxhealth.innerHTML = ninjaEnemy.health
    enemySTR.innerHTML = ninjaEnemy.strength
    enemyDEF.innerHTML = ninjaEnemy.defence

    return ninjaEnemy
}
let spawnedNinjaEnemy = spawn()

//--------------------------------------------------------------------------------------------------------------------------

//-----ENEMY-AND-PLAYER-ATTACK-DAMAGE-ATTRIBUTION---------------------------------------------------------------------------


let enemyAttackDamage = spawnedNinjaEnemy.strength - ninjaPlayer.defence
let playerAttackDMG = playerSTR - spawnedNinjaEnemy.defence

//--------------------------------------------------------------------------------------------------------------------------

//------ATTACK-FUNCTION-----------------------------------------------------------------------------------------------------

function attack(str, def, attacker, receiver, health) {
    // O ataque do personagem pega a força dele e retira o HP do inimigo
    // Se a vida do inimigo for maior que 0, ele ataca 2 segundos depois
    // As informaçoes dos ataques tem que ser exibidas na tela 
    // No final do ataque, a função chama a função checkWinner() 

    disableButtons()

    spawnedNinjaEnemy.health = spawnedNinjaEnemy.health - playerAttackDMG
    enemyHealth.innerHTML = spawnedNinjaEnemy.health

    battleCommentary.innerHTML = `The player has attacked ${spawnedNinjaEnemy.name}, dealing ${playerAttackDMG} damage`

    if (spawnedNinjaEnemy.health > 0) {
        setTimeout(() => {
            ninjaPlayer.health = ninjaPlayer.health - enemyAttackDamage
            playerHealth.innerHTML = ninjaPlayer.health

            battleCommentary.innerHTML = `${spawnedNinjaEnemy.name} has attacked the player, dealing ${enemyAttackDamage} damage`
        }, 2000)
    }

    setTimeout(() => {
        checkWinner()
    }, 4000)

}
//--------------------------------------------------------------------------------------------------------------------------

//---------CHECK-WINNER-----------------------------------------------------------------------------------------------------

function checkWinner() {

    if (ninjaPlayer.health <= 0) {
        battleCommentary.innerHTML = "The player's HP reached 0"
        setTimeout(() => {
            battleCommentary.innerHTML = 'TRY AGAIN'
            restartGame()
            setTimeout(() => {
                battleCommentary.innerHTML = 'attack the oponnent!'
            }, 2000)
        }, 2500)
        enableButtons()
        return
    }

    if (spawnedNinjaEnemy.health <= 0) {
        battleCommentary.innerHTML = `The ${spawnedNinjaEnemy.name} has fainted`
        setTimeout(() => {
            battleCommentary.innerHTML = `Another enemy has appeared`
            respawnEnemy()
            restorePlayerHealth()

        }, 2500);
        setTimeout(() => {
            battleCommentary.innerHTML = 'attack the oponnent!'
        }, 5000)
        enableButtons()
        return
    }

    setTimeout(() => {
        if (ninjaPlayer.health > 0) {
            battleCommentary.innerHTML = 'Make another move!'
            enableButtons()
        }
    }, 1000)

}
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
function restartGame() {
    restorePlayerHealth()
    respawnEnemy()
    enableButtons()
}

//--------------------------------------------------------------------------------------------------------------------------

btnFire.addEventListener('click', respawnEnemy)
btnLeaf.addEventListener('click', attack)
btnWater.addEventListener('click', attack)


