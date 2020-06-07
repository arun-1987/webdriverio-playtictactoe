/* global describe it */
import Game from '../src/pages/Game'

describe('play tic tac toe', () => {
  it('Find the Winner', () => {
    Game.launchApplication()
    Game.verifyGameIsDisplayed()
    Game.playGame()
  })
})
