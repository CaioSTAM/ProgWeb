import { TAMX } from "./config.js"
import { space } from "./space.js"
import { fireProjectile } from "./projectile.js"
import { hud } from "./hud.js"
import { getEnemies, removeEnemy } from "./enemyShip.js"
import { getObstacles, removeObstacle } from "./obstacles.js"
import { getSelectedCharacter } from "./game.js"

const directionsLuke = [
  "assets/png/x-wingLeft.png",
  "assets/png/x-wingParada.png",
  "assets/png/x-wingRight.png",
]

const directionsHan = [
  "assets/png/milleniumFalconLeft.png",
  "assets/png/milleniumFalconParada.png",
  "assets/png/milleniumFalconRight.png",
]



const laserSound = new Audio("assets/sounds/tiroX-Wing.mp3");
laserSound.volume = 0.3; 
laserSound.load()

const damageSound = new Audio("assets/sounds/tomouDano.mp3")
damageSound.volume = 0.4
damageSound.load()


class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.character = "Luke"
    this.directions = this.character === "Han" ? directionsHan : directionsLuke 
    this.element.src = this.directions[this.direction] 
    this.element.style.bottom = "20px"
    this.element.style.left = `${TAMX / 2 - 50}px`
    this.speed = 5;
    space.element.appendChild(this.element)
  }

  setCharacter(characterName) {
    this.character = characterName
    this.directions = this.character === "Han" ? directionsHan : directionsLuke
    this.element.src = this.directions[this.direction]
}
  changeDirection(giro) { // -1 +1
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro
    this.element.src = this.directions[this.direction]
  }
  move() { // ajustado para inserir velocidade da nave
    const left = parseInt(this.element.style.left)
    const width = this.element.offsetWidth

    if (this.direction === 0 && left > 0) {
      this.element.style.left = `${left - this.speed}px`
    }

    if (this.direction === 2 && left < TAMX - width) {
      this.element.style.left = `${left + this.speed}px`
    }
  }

  shoot() {
    const x = parseInt(this.element.style.left) + this.element.offsetWidth / 2 - 5
    const y = space.element.offsetHeight - 60
    fireProjectile(x, y)

    laserSound.currentTime = 0
    laserSound.play();

}

checkCollision() {
  if (this.invulnerable) return

  const shipRect = this.element.getBoundingClientRect()

  // Verifica colisão com naves inimigas
  for (const enemy of getEnemies()) {
    const rect = enemy.element.getBoundingClientRect()
    if (this.collidesWith(shipRect, rect)) {
      removeEnemy(enemy)
      this.takeDamage()
      return
    }
  }

  // Verifica colisão com obstáculos
  for (const obs of getObstacles()) {
    const rect = obs.getRect()
    if (this.collidesWith(shipRect, rect)) {
      removeObstacle(obs)
      this.takeDamage()
      return
    }
  }
}

takeDamage() {
  this.damagedImage = this.character === "Han" ? "assets/png/milleniumFalconDanificada.png"
  : "assets/png/x-wingDanificada.png"

  if (this.invulnerable) return
  hud.loseLife()
  this.invulnerable = true
  const originalImage = this.directions[this.direction]
  this.element.src = this.damagedImage


  damageSound.currentTime = 0
  damageSound.play()

  setTimeout(() => {
    this.element.src = originalImage
    this.invulnerable = false
  }, 5000) //tempo que o player fica invencivel após ser atingido
}

collidesWith(r1, r2) {
  return (
    r1.left < r2.right &&
    r1.right > r2.left &&
    r1.top < r2.bottom &&
    r1.bottom > r2.top
  )
}


}

export const ship = new Ship()