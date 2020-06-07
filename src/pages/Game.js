/* global  browser expect $ $$ */
import Page from './page'

class Game extends Page {
  constructor () {
    super()
    this.appUrl = 'https://playtictactoe.org/'
    this.gameHome = "//div[@class='game']"
    this.player1Score = "//p[@class='player1']/span[contains(@class,'score')]"
    this.computerScore = "//p[@class='player2']/span[contains(@class,'score')]"
    this.emptyBoxes = "//div[@class='board']/div[div[@class='']]"
    this.dynamicSelector = "//div[@class='temp']"
    this.restart = "//div[@class='game']/div[@class='restart']"
  }

  launchApplication () {
    super.open(this.appUrl)
  }

  verifyGameIsDisplayed () {
    const gamehome = $(this.gameHome)
    expect(gamehome).toBeDisplayed()
  }

  getPlayerScore () {
    const player1Score = $(this.player1Score)
    const scorele = parseInt(player1Score.getText())
    return scorele
  }

  getSystemScore () {
    const computerScore = $(this.computerScore)
    const scorele = parseInt(computerScore.getText())
    return scorele
  }

  getNextFreeBoxToClick () {
    var nextOptionMap = new Map()
    const emptyboxs = $$(this.emptyBoxes)
    emptyboxs.forEach((emptybox, index) => nextOptionMap.set(index, emptybox.getAttribute('class')))
    return nextOptionMap
  }

  clickNextFreeBox () {
    var boxMap = this.getNextFreeBoxToClick()
    const num = Math.floor(Math.random() * boxMap.size)
    $(this.dynamicSelector.replace('temp', boxMap.get(num))).click()
    browser.pause(3000)
  }

  winnerIs () {
    const pscore = this.getPlayerScore()
    const sscore = this.getSystemScore()
    if (pscore > sscore) {
      console.log('Winner is Player1')
    } else {
      console.log('Winner is System')
    }
  }

  checkRestart () {
    const restart = $(this.restart).getAttribute('style')
    if (restart.includes('none')) {
      return true
    } else {
      return false
    }
  }

  playGame () {
    let num = 0
    while (num < 4) {
      while (this.checkRestart()) {
        this.clickNextFreeBox()
      }
      $("//div[div[@class='restart']]").click()
      num++
    }
    this.winnerIs()
  }
}
export default new Game()
