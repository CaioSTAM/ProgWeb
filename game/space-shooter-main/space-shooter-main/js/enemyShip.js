import { TAMX, PROB_ENEMY_SHIP } from "./config.js"
import { space } from "./space.js"

class EnemyShip {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/tie-fighter.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
    this.points = 50
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + 1}px`

  }
}

const enemyShips = []

export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip())
}

export const moveEnemyShips = () => {
  enemyShips.forEach(e => e.move())

  for (const e of enemyShips.slice()) {
  e.move()
  if (parseInt(e.element.style.top) > space.element.offsetHeight) {
    e.element.remove()
    enemyShips.splice(enemyShips.indexOf(e), 1)
  }
}

}

export const getEnemies = () => enemyShips

export const removeEnemy = (enemy) => {
  enemy.element.remove()
  const index = enemyShips.indexOf(enemy)
  if (index > -1) enemyShips.splice(index, 1)
}
