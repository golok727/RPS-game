export default class Game {
  /**
   *
   * @param {HTMLDivElement} gameContainer
   */
  constructor(gameContainer) {
    this.gameContainer = gameContainer
    this.choicesMenu = this.gameContainer.querySelector("[data-user-choices]")
    this.winnerMenu = document.querySelector("[data-winner-menu]")
    this.score = 0
    this.chance = 0
    this.chanceLimit = 10

    this.modal = document.querySelector("[data-rules-modal]")
    this.modelOpenBtn = document.querySelector("[data-open-rules]")
    this.userChoices = [
      ...gameContainer.querySelectorAll(".each-choice:not(.winner-page)"),
    ]
    this.scoreBoardScoreArea = gameContainer.querySelector("[data-score-count]")
    this.modal.addEventListener("click", (e) => {
      if (e.target.classList.toString().match(/(?:close-btn|rules)/g)) {
        this.modal.classList.add("hidden")
      }
    })

    this.modelOpenBtn.addEventListener("click", () => {
      this.modal.classList.remove("hidden")
    })

    setTimeout(() => {
      this.userChoices.forEach((choice) =>
        choice.addEventListener("click", this.handleChoice.bind(this))
      )
    }, 2000)

    this.renderScore()
  }

  renderScore() {
    this.scoreBoardScoreArea.innerText = this.score
  }

  handleChoice(e) {
    const userChoice = e.target.getAttribute("data-choice-type")
    e.target.classList.add("current")

    const others = document.querySelectorAll(
      ".each-choice:not(.current), img.tri"
    )

    others.forEach((other) => other.classList.add("get-away"))
    setTimeout(() => {
      this.choicesMenu.classList.add("hidden")
      others.forEach((other) => other.classList.remove("get-away"))
      e.target.classList.remove("current")
      this.handleWinnerMenu(userChoice)
    }, 2000)
  }

  handleWinnerMenu(userChoice) {
    this.winnerMenu.classList.remove("hidden")
    const computerChoice = this.getComputerChoice()
    const winner = this.getWinner(computerChoice, userChoice)
    const userDiv = this.winnerMenu.querySelector("[data-type='user']")
    const compDiv = this.winnerMenu.querySelector("[data-type='computer']")
    console.log({ userChoice, computerChoice, winner })
    userDiv.setAttribute("data-choice-type", userChoice)
    compDiv.setAttribute("data-choice-type", computerChoice)

    // backend

    if (winner === "user") {
      this.score += 2
      this.renderScore()
      this.scoreBoardScoreArea.classList.remove("red")
    } else if (winner === "tie") {
      this.score += 1
      this.renderScore()
    } else {
      this.chance += 1
      this.scoreBoardScoreArea.classList.remove("focus-in")
      this.scoreBoardScoreArea.classList.add("red")
      this.renderScore()
    }

    console.log(this.score)

    this.winnerMenu.querySelector(
      ".left img"
    ).src = `/assets/images/icon-${userChoice}.svg`

    this.winnerMenu.querySelector(
      ".right img"
    ).src = `/assets/images/icon-${computerChoice}.svg`

    const playAgainMenu = this.winnerMenu.querySelector(".mid")

    playAgainMenu.querySelector("h1").innerText = this.getWinnerText(winner)

    const playAgainBtn = playAgainMenu.querySelector("button")
    playAgainBtn.addEventListener("click", this.handlePlayAgain.bind(this))

    if (winner === "comp") playAgainBtn.classList.add("out")
    else playAgainBtn.classList.remove("out")
  }

  getWinnerText(winner) {
    const texts = { user: "YOU WON", comp: "YOU LOOSE", tie: "It's Tie" }

    return texts[winner]
  }

  getWinner(cc, uc) {
    if (cc === uc) return "tie"
    if (
      (cc === "paper" && uc === "rock") ||
      (cc == "rock" && uc === "scissors") ||
      (cc === "scissors" && uc === "paper")
    ) {
      return "comp"
    }

    return "user"
  }
  getComputerChoice() {
    // return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
    return "rock"
  }

  handlePlayAgain(e) {
    console.log("click", this.chance)
    if (this.chance === this.chanceLimit - 1) e.target.innerText = "RESET"
    if (this.chance >= this.chanceLimit) {
      this.reset({ btnPlayAgain: e.target })
    }
    console.log(this.winnerMenu)
    this.winnerMenu.classList.add("hidden")
    this.choicesMenu.classList.remove("hidden")
  }

  reset(props = null) {
    if (props && props.btnPlayAgain) {
      props.btnPlayAgain.innerText = "Play Again"
    }
    this.scoreBoardScoreArea.classList.remove("red")
    console.log("reset")
    this.score = 0
    this.chance = 0
    this.renderScore()
  }
}
