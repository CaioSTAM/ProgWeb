import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { createRandomEnemyShip, moveEnemyShips } from "./enemyShip.js"
import { createRandomObstacles, moveObstacles, increaseDifficulty } from "./obstacles.js"
import { updateProjectiles } from "./projectile.js"
import { hud } from "./hud.js"
import { showGameOver } from "./gameover.js"

let running = false
let paused = false
let pauseLabel = null
let selectedCharacter = null
let gamePhase = "start" // pode ser "start", "select", "ready", "playing"



function init() {
  setInterval(run, 1000 / FPS)

  // Aumenta a dificuldade a cada 60 segundos
  setInterval(() => {
    if (running && !paused) {
      increaseDifficulty()
    }
  }, 60000)
}

function showStartScreen() {
  const startDiv = document.createElement("div")
  startDiv.id = "start-screen"
  startDiv.innerHTML = `
    <h1>STAR WARS: GALAXY SHOOTER</h1>
    <button id="start-btn">JOGAR</button>
  `
  document.body.appendChild(startDiv)

  document.getElementById("start-btn").addEventListener("click", () => {
    startDiv.remove()
    showCharacterSelect()
  })

  gamePhase = "start"
}

function showCharacterSelect() {
  const charDiv = document.createElement("div")
  charDiv.id = "char-select"
  charDiv.innerHTML = `
    <h2>Escolha seu personagem</h2>
    <div class="characters">
      <div class="char-option" data-name="Luke">
        <img src="assets/png/lukeSkywalker.png" alt="Luke Skywalker">
        <p>Luke Skywalker</p>
      </div>
      <div class="char-option" data-name="Han">
        <img src="assets/png/hanSolo.png" alt="Han Solo">
        <p>Han Solo</p>
      </div>
    </div>
    <p class="small-tip">Pressione <strong>barra de espaço</strong> para iniciar</p>
  `
  document.body.appendChild(charDiv)

  document.querySelectorAll(".char-option").forEach(option => {
    option.addEventListener("click", () => {
      selectedCharacter = option.dataset.name
      ship.setCharacter(selectedCharacter)
      charDiv.remove()
      gamePhase = "ready"
    })
  })

  gamePhase = "select"
}


window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") ship.changeDirection(-1)
  if (e.key === "ArrowRight") ship.changeDirection(+1)

  if (e.code === "Space") {
     if (gamePhase === "ready") {
      gamePhase = "playing"
      running = true

    // Define a skin da nave
    if (selectedCharacter === "Han") {
      ship.element.src = "assets/png/milleniumFalconParada.png"
    } else if (selectedCharacter === "Luke") {
      ship.element.src = "assets/png/x-wingParada.png"
    }
  }
    if (!running) {
      running = true
    } else if (!paused) {
      ship.shoot?.()
    }
  }

  if (e.key.toLowerCase() === "p") {
    paused = !paused
    if (paused) showPauseLabel()
    else hidePauseLabel()
  }
})

function run() {
  if (!running || paused) return

  space.move()
  ship.move()

  createRandomEnemyShip()
  moveEnemyShips()

  createRandomObstacles()
  moveObstacles()

  updateProjectiles()
  ship.checkCollision()

  if (hud.isGameOver()) {
    running = false
    showGameOver(() => {
      running = true
    })
  }
}

function showPauseLabel() {
  if (!pauseLabel) {
    pauseLabel = document.createElement("div")
    pauseLabel.innerText = "PAUSADO"
    pauseLabel.id = "pause-label"
    space.element.appendChild(pauseLabel)
    requestAnimationFrame(() => pauseLabel.classList.add("visible"))
  }
}

function hidePauseLabel() {
  if (pauseLabel) {
    pauseLabel.classList.remove("visible")
    setTimeout(() => {
      pauseLabel?.remove()
      pauseLabel = null
    }, 300)
  }
}

export function setSelectedCharacter(name) {
  selectedCharacter = name
}

export function getSelectedCharacter() {
  return selectedCharacter
}

showStartScreen()
init()

