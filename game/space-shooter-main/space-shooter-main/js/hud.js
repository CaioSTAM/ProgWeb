import { space } from "./space.js"

class HUD {
  constructor() {
    this.score = 0
    this.lives = 3

    this.container = document.createElement("div")
    this.container.id = "hud"
    this.container.style.position = "absolute"
    this.container.style.top = "10px"
    this.container.style.right = "10px"
    this.container.style.color = "white"
    this.container.style.fontSize = "20px"
    this.container.style.fontFamily = "Arial"
    this.container.style.zIndex = "10"
    this.container.style.display = "flex"
    this.container.style.alignItems = "center"
    this.container.style.gap = "10px"

    // Score display
    this.scoreDisplay = document.createElement("div")
    this.scoreDisplay.innerText = `Score: ${this.score}`
    this.container.appendChild(this.scoreDisplay)

    // Lives display
    this.livesContainer = document.createElement("div")
    this.livesContainer.id = "lives"
    this.updateLivesDisplay()
    this.container.appendChild(this.livesContainer)

    // Add to DOM
    space.element.appendChild(this.container)
  }

  updateScore(points) {
    this.score += points
    this.scoreDisplay.innerText = `Score: ${this.score}`
  }

  loseLife() {
    if (this.lives > 0) {
      this.lives--
      this.updateLivesDisplay()
    }
  }

  updateLivesDisplay() {
    this.livesContainer.innerHTML = ""
    for (let i = 0; i < this.lives; i++) {
      const lifeImg = document.createElement("img")
      lifeImg.src = "assets/png/life.png"
      lifeImg.style.width = "50px"
      lifeImg.style.height = "50px"
      this.livesContainer.appendChild(lifeImg)
    }
  }

  reset() {
    this.score = 0
    this.lives = 3
    this.updateLivesDisplay()
    this.updateScore(0)
  }

  isGameOver() {
    return this.lives <= 0
  }
}

export const hud = new HUD()
