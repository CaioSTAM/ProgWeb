import { TAMX } from "./config.js"
import { space } from "./space.js"

let difficultyMultiplier = 1


class Obstacle {
  constructor(type, imgSrc, points, speed, width = 50, height = 50) {
  this.type = type
  this.points = points
  this.speed = speed
  this.element = document.createElement("img")
  this.element.src = imgSrc
  this.element.className = "obstacle"
  this.element.style.position = "absolute"
  this.element.style.width = `${width}px`
  this.element.style.height = `${height}px`
  this.element.style.top = "-40px"
  this.element.style.left = `${Math.floor(Math.random() * (TAMX - width))}px`
  space.element.appendChild(this.element)
}


  move() {
    const top = parseInt(this.element.style.top)
    this.element.style.top = `${top + this.speed}px`
  }

  destroy() {
    this.element.remove()
    activeObstacles = activeObstacles.filter(o => o !== this)
  }

  isOutOfBounds() {
    return parseInt(this.element.style.top) > space.element.offsetHeight
  }

  getRect() {
    return this.element.getBoundingClientRect()
  }
}

let activeObstacles = []

const obstacleTypes = [
  {
    type: "ufo",
    img: "assets/png/enemyUFO.png",
    points: 20,
    minSpeed: 1,
    maxSpeed: 3,
    prob: 0.002
  },
  {
    type: "asteroidBig",
    img: "assets/png/meteorBig.png",
    points: 10,
    width: 100,
    height: 100,
    minSpeed: 1,
    maxSpeed: 2,
    prob: 0.004
  },
  {
    type: "asteroidSmall",
    img: "assets/png/meteorSmall.png",
    width: 50,
    height: 50,
    points: 100,
    minSpeed: 2,
    maxSpeed: 4,
    prob: 0.004
  }
]

export function createRandomObstacles() {
  for (const def of obstacleTypes) {
    if (Math.random() < def.prob) {
      const speed = (def.minSpeed + Math.random() * (def.maxSpeed - def.minSpeed)) * difficultyMultiplier
      const o = new Obstacle(def.type, def.img, def.points, speed, def.width, def.height)
      activeObstacles.push(o)
    }
  }
}

export function moveObstacles() {
  for (const o of activeObstacles.slice()) {
    o.move()
    if (o.isOutOfBounds()) o.destroy()
  }
}

export function getObstacles() {
  return activeObstacles
}

export function removeObstacle(obj) {
  obj.destroy()
}

export function increaseDifficulty() {
  difficultyMultiplier += 0.1 // aumenta 10% a cada minuto
}

