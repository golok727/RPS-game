export default class Game {
  /**
   *
   * @param {HTMLDivElement} gameContainer
   */
  constructor(gameContainer) {
    this.gameContainer = gameContainer
    this.score = 0
    this.modal = document.querySelector("[data-rules-modal]")
    this.modelOpenBtn = document.querySelector("[data-open-rules]")

    this.modal.addEventListener("click", (e) => {
      if (e.target.classList.toString().match(/(?:close-btn|rules)/g)) {
        this.modal.classList.add("hidden")
      }
    })

    this.modelOpenBtn.addEventListener("click", () => {
      this.modal.classList.remove("hidden")
    })
  }
  reset() {
    this.score = 0
  }
}
