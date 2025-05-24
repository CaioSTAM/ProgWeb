import { hud } from "./hud.js"
import { ship } from "./ship.js"
import { space } from "./space.js"
import { getEnemies, removeEnemy } from "./enemyShip.js"
import { getObstacles, removeObstacle } from "./obstacles.js"

let gameOverScreen = null

export function showGameOver(onRestart) {
  if (gameOverScreen) return

  gameOverScreen = document.createElement("div")
  gameOverScreen.id = "game-over"
  gameOverScreen.innerHTML = `
    <h1>GAME OVER</h1>
    <button id="restart-button">Reiniciar</button>
  `
  space.element.appendChild(gameOverScreen)

  document.getElementById("restart-button").addEventListener("click", () => {
    resetGame()
    gameOverScreen.remove()
    gameOverScreen = null
    onRestart()
  })

  requestAnimationFrame(() => gameOverScreen.classList.add("visible"))
}

function resetGame() {
  for (const e of getEnemies()) removeEnemy(e)
  for (const o of getObstacles()) removeObstacle(o)

  hud.reset()
  ship.element.src = "assets/png/x-wingParada.png"
  ship.invulnerable = false
}

