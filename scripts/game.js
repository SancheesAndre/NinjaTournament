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

//----------ENEMY-BOX-DOM---------------------------------------------------------------------------------------------------

let enemyName = document.getElementById('enemyName')
let enemyHealth = document.getElementById('enemyCurrentHealth')
let enemyMaxhealth = document.getElementById('enemyMaxHealth')
let enemySTR = document.getElementById('enemyStrength')
let enemyDEF = document.getElementById('enemyDefense')
let enemySprite = document.getElementById('enemyImg')

//----------Buttons-DOM-----------------------------------------------------------------------------------------------------

let btnFire = document.querySelector('#btnFire')
let btnLeaf = document.querySelector('#btnLeaf')
let btnWater = document.querySelector('#btnWater')
let btnToggleMusic = document.querySelector('#toggleMusic')

btnFire.addEventListener('click', attack)
btnLeaf.addEventListener('click', attack)
btnWater.addEventListener('click', attack)
btnToggleMusic.addEventListener('click', toggleAudio)

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

//------GAME-START----------------------------------------------------------------------------------------------------------

let btnGameStart = document.getElementById('gameStart')
btnGameStart.addEventListener('click', startGame)

function startGame() {

    battleCommentary.innerHTML = 'Make a move!'
    btnFire.classList.remove('displayNone')
    btnLeaf.classList.remove('displayNone')
    btnWater.classList.remove('displayNone')

    btnGameStart.classList.add('displayNone')
    bgAudio.play()
    bgAudio.volume = 0.05

}

//------GAME-RESET----------------------------------------------------------------------------------------------------------

function restartGame() {
    restorePlayerHealth()
    respawnEnemy()
    enableButtons()
    resetScore()

    btnFire.classList.add('displayNone')
    btnLeaf.classList.add('displayNone')
    btnWater.classList.add('displayNone')

    btnGameStart.classList.remove('displayNone')

}

//---------PLAYER-SPAWN-----------------------------------------------------------------------------------------------------

const playerArray = [
    ['Black Ninja', './charactersMedia/Player/DarkNinja/Faceset.png', 20, 6, 4]
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

//-----------MONSTERS-ARRAY-------------------------------------------------------------------------------------------------

const monstersArray = [
    ['Leaf Ninja', './charactersMedia/GreenNinja/Faceset.png', 22, 8, 3, 'btnLeaf'],
    ['Water Ninja', './charactersMedia/BlueNinja/Faceset.png', 30, 6, 4, 'btnWater'],
    ['Fire Ninja', './charactersMedia/RedNinja/Faceset.png', 30, 8, 2, 'btnFire']
]

//---------ENEMY-SPAWN/RESPAWN----------------------------------------------------------------------------------------------

function respawnEnemy() {
    spawnedNinjaEnemy = spawn()
    playerAttack()
    enemyAttack()

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

//-----ENEMY-AND-PLAYER-ATTACK-DAMAGE-ATTRIBUTION---------------------------------------------------------------------------

function playerCritAttack() {
    return (playerSTR * 2) - spawnedNinjaEnemy.defence

}

function playerAttack() {
    return playerSTR - spawnedNinjaEnemy.defence

}

function enemyAttack() {
    return spawnedNinjaEnemy.strength - ninjaPlayer.defence
}

//------ATTACK-FUNCTION-----------------------------------------------------------------------------------------------------

function attack() {

    disableButtons()

    //---PLAYER ATTACK-------------------------

    setTimeout(() => {
        playerAttackAudio.volume = 0.2
        playerAttackAudio.play()

        //---SAME-TYPE_CASE---------------------------------------------------------------------------------------------------------------------------------

        if (this.id == spawnedNinjaEnemy.type) {
            spawnedNinjaEnemy.health = spawnedNinjaEnemy.health - playerAttack()
            enemyHealth.innerHTML = spawnedNinjaEnemy.health
            battleCommentary.innerHTML = `The player has attacked ${spawnedNinjaEnemy.name}, dealing ${playerAttack()} damage`
        }

        //---FIRE-BUTTON-CASES---------------------------------------------------------------------------------------------------------------------------------

        if (this.id == 'btnFire' && spawnedNinjaEnemy.type == 'btnLeaf') {
            spawnedNinjaEnemy.health = spawnedNinjaEnemy.health - playerCritAttack()
            enemyHealth.innerHTML = spawnedNinjaEnemy.health
            battleCommentary.innerHTML = `The attack was SUPER EFFECTIVE, dealing ${playerCritAttack()} damage`
        }

        if (this.id == 'btnFire' && spawnedNinjaEnemy.type == 'btnWater') {
            battleCommentary.innerHTML = `The attack had no effect!`
        }

        //---LEAF-BUTTON-CASES---------------------------------------------------------------------------------------------------------------------------------

        if (this.id == 'btnLeaf' && spawnedNinjaEnemy.type == 'btnWater') {
            spawnedNinjaEnemy.health = spawnedNinjaEnemy.health - playerCritAttack()
            enemyHealth.innerHTML = spawnedNinjaEnemy.health
            battleCommentary.innerHTML = `The attack was SUPER EFFECTIVE, dealing ${playerCritAttack()} damage`
        }

        if (this.id == 'btnLeaf' && spawnedNinjaEnemy.type == 'btnFire') {
            battleCommentary.innerHTML = `The attack had no effect!`
        }

        //---WATER-BUTTON-CASES-----------------------------------------------------------------------------------------------------------------------

        if (this.id == 'btnWater' && spawnedNinjaEnemy.type == 'btnFire') {
            spawnedNinjaEnemy.health = spawnedNinjaEnemy.health - playerCritAttack()
            enemyHealth.innerHTML = spawnedNinjaEnemy.health
            battleCommentary.innerHTML = `The attack was SUPER EFFECTIVE, dealing ${playerCritAttack()} damage`
        }

        if (this.id == 'btnWater' && spawnedNinjaEnemy.type == 'btnLeaf') {
            battleCommentary.innerHTML = `The attack had no effect!`
        }
    }, 500)

    //---ENEMY ATTACK--------------------------


    setTimeout(() => {
        if (spawnedNinjaEnemy.health > 0) {
            enemyAttackAudio.volume = 0.2
            enemyAttackAudio.play()

            ninjaPlayer.health = ninjaPlayer.health - enemyAttack()

            playerHealth.innerHTML = ninjaPlayer.health

            battleCommentary.innerHTML = `${spawnedNinjaEnemy.name} has attacked the player, dealing ${enemyAttack()} damage`
        }
    }, 2000)

    //---Checking-Winner------------------------------------

    setTimeout(() => {
        checkWinner()
    }, 2000)

}

//---------CHECK-WINNER-FUNCTION-----------------------------------------------------------------------------------------------------

function checkWinner() {

    //-------PLAYER-DIES-CASE--------------------------------------------------------------

    if (ninjaPlayer.health <= 0) {
        setTimeout(() => {
            battleCommentary.innerHTML = "The player's HP reached 0"
        }, 1500)

        setTimeout(() => {
            battleCommentary.innerHTML = '<h1>GAME OVER</h1>The game will be restarted!'
            bgAudio.pause()
            gameOver.play()
            setTimeout(() => {
                battleCommentary.innerHTML = 'Press PLAY'
                enableButtons()
                restartGame()
            }, 3000)
        }, 3000)
    }

    //-------ENEMY-DIES-CASE--------------------------------------------------------------

    if (spawnedNinjaEnemy.health <= 0) {
        setTimeout(() => {
            battleCommentary.innerHTML = `The ${spawnedNinjaEnemy.name} has fainted<br><h3> +1 score point</h3>`
            addScorePoints()
            scoreAudio.volume = 0.4
            scoreAudio.play()
        }, 1000)
        if (score === 9) {
            setTimeout(() => {
                bgAudio.pause()
                gameWin.play()
                battleCommentary.innerHTML = "Congratulations, YOU'VE WON the tournament"
            }, 3000)
            setTimeout(() => {
                restartGame()
                battleCommentary.innerHTML = "PLAY AGAIN"
            }, 5000)
            return
        }

        setTimeout(() => {
            battleCommentary.innerHTML = `Another enemy has appeared`
            respawnEnemy()
            restorePlayerHealth()

        }, 4000);
        setTimeout(() => {
            battleCommentary.innerHTML = 'attack the oponnent!'
        }, 6000)

        enableButtons()
        return
    }

    //-----BATTLE-CONTINUES-CASE----------------------------------------------------------

    setTimeout(() => {
        if (ninjaPlayer.health > 0) {
            battleCommentary.innerHTML = 'Make another move!'
            enableButtons()
        }
    }, 2000)


}

//-----SCOREBOARD-FUNCTION----------------------------------------------------------------------------------------------------------

let scoreboard = document.getElementById('scoreboard')
let score = 0

function addScorePoints() {
    ++score
    scoreboard.innerHTML = score
}


function resetScore() {
    score = 0
    scoreboard.innerHTML = 0

}
//------AUDIO-SETTINGS--------------------------------------------------------------------------------------------------------

const bgAudio = document.getElementById('bgAudio')
const scoreAudio = document.getElementById('scoreAudio')
const gameOver = document.getElementById('gameOverAudio')
const gameWin = document.getElementById('winAudio')
const playerAttackAudio = document.getElementById('playerAttackAudio')
const enemyAttackAudio = document.getElementById('enemyAttackAudio')

function toggleAudio() {
    if (bgAudio.classList.contains('bgAudioActive')) {
        btnToggleMusic.innerText = 'Music OFF'
        bgAudio.pause()
        bgAudio.classList.remove('bgAudioActive')
    } else {

        bgAudio.play()
        bgAudio.volume = 0.05
        bgAudio.classList.add('bgAudioActive')
        btnToggleMusic.innerText = 'Music ON'
    }
}