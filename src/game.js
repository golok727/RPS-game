export default class Game {
  /**
   *
   * @param {HTMLDivElement} gameContainer
   */
  constructor(gameContainer) {
    this.gameContainer = gameContainer
    this.score = 0
  }

  reset() {
    this.score = 0
  }
}
