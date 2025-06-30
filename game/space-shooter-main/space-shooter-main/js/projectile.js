import { space } from "./space.js"
import { hud } from "./hud.js"
import { getEnemies, removeEnemy } from "./enemyShip.js"
import { getObstacles, removeObstacle } from "./obstacles.js"

const explosion = new Audio("assets/sounds/deuDano.mp3")
explosion.volume = 0.4

class Projectile {
  constructor(x, y) {
    this.element = document.createElement("img")
    this.element.src = "assets/png/laserGreen.png"
    this.element.className = "projectile"
    this.element.style.position = "absolute"
    this.element.style.left = `${x}px`
    this.element.style.top = `${y}px`
    this.speed = 5
    space.element.appendChild(this.element)
  }

  move() {
    const top = parseInt(this.element.style.top)
    this.element.style.top = `${top - this.speed}px`
  }

  isOutOfBounds() {
    return parseInt(this.element.style.top) < -20
  }

  checkCollision() {
  const rect = this.element.getBoundingClientRect()
  

  for (const enemy of getEnemies()) {
    if (this.collidesWith(rect, enemy.element.getBoundingClientRect())) {
      hud.updateScore(enemy.points || 50)
      removeEnemy(enemy)
      this.destroy(true)
      explosion.currentTime = 0
      explosion.play()
      return
    }
  }

  for (const obs of getObstacles()) {
    if (this.collidesWith(rect, obs.getRect())) {
      hud.updateScore(obs.points || 0)
      removeObstacle(obs)
      this.destroy(true)
      explosion.currentTime = 0
      explosion.play()
      return
    }
  }
}

collidesWith(r1, r2) {
  return (
    r1.left < r2.right &&
    r1.right > r2.left &&
    r1.top < r2.bottom &&
    r1.bottom > r2.top
  )
}

  destroy(hit = false) {
  if (hit) {
    this.element.src = "assets/png/laserGreenShot.png" // imagem de impacto
    this.element.style.width = "40px"
    this.element.style.height = "40px"
    this.element.style.zIndex = "20"
    setTimeout(() => {
      this.element.remove()
      activeProjectiles = activeProjectiles.filter(p => p !== this)
    }, 50) //tempo que o projétil continua existindo após o impacto
  } else {
    this.element.remove()
    activeProjectiles = activeProjectiles.filter(p => p !== this)
  }
}

}

let activeProjectiles = []

export function fireProjectile(x, y) {
  const proj = new Projectile(x, y)
  activeProjectiles.push(proj)
}

export function updateProjectiles() {
  for (let p of activeProjectiles.slice()) {
    p.move()
    p.checkCollision()
    if (p.isOutOfBounds()) p.destroy()
  }
}
