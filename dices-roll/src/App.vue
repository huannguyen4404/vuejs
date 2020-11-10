<template>
  <div id="app">
    <div class="wrapper clearfix">
      <Players
        v-bind:isWinner="isWinner"
        v-bind:activePlayer="activePlayer"
        v-bind:rollingScore="rollingScore"
        v-bind:scores="scores"
      />

      <Controls
        v-bind:isPlaying="isPlaying"
        v-bind:victoryScore="victoryScore"
        v-on:set-victory-score="setTargetScore"
        v-on:end-turn="handleEndTurn"
        v-on:show-rules="showRules"
        v-on:on-roll="handleRollDice"
      />

      <Dices v-bind:diceNums="diceNums" />

      <RulesModal
        v-on:init-new-game="initNewGame"
        v-bind:isOpenPopup="isOpenPopup"
      />
    </div>
  </div>
</template>

<script>
import Players from './components/Players'
import Controls from './components/Controls'
import Dices from './components/Dices'
import RulesModal from './components/RulesModal'

export default {
  name: 'App',
  data() {
    return {
      isPlaying: false,
      isOpenPopup: false,
      activePlayer: 0,
      scores: [0, 0],
      diceNums: [1, 6],
      rollingScore: 0, // temp score
      victoryScore: 10
    }
  },
  components: {
    Players,
    Controls,
    Dices,
    RulesModal
  },
  computed: {
    isWinner() {
      const { scores, victoryScore } = this
      return scores[0] >= victoryScore || scores[1] >= victoryScore
    }
  },
  methods: {
    setTargetScore(e) {
      // How many point to win
      const victoryScore = parseInt(e.target.value)
      this.victoryScore = !isNaN(victoryScore) ? victoryScore : ''
    },
    handleEndTurn() {
      if (!this.isPlaying) {
        return alert('Please start game.')
      }
      const { scores, activePlayer, rollingScore } = this
      const scoreOld = scores[activePlayer]
      this.$set(this.scores, activePlayer, scoreOld + rollingScore)
      if (!this.isWinner) {
        return this.nextPlayer()
      }
      this.isPlaying = false // end game
    },
    nextPlayer() {
      this.activePlayer = this.activePlayer === 0 ? 1 : 0
      this.rollingScore = 0
    },
    showRules() {
      console.log('Show popup')
      this.isOpenPopup = true
    },
    initNewGame() {
      this.isPlaying = true
      this.isOpenPopup = false
      this.activePlayer = 0
      this.diceNums = [1, 1]
      this.scores = [0, 0]
      this.rollingScore = 0
    },
    handleRollDice() {
      if (!this.isPlaying) {
        return alert('Please start game.')
      }
      // Random Dices
      const dice1 = Math.floor(Math.random() * 6) + 1
      const dice2 = Math.floor(Math.random() * 6) + 1
      this.diceNums = [dice1, dice2]

      if (dice1 === 1 || dice2 === 1) {
        const activePlayer = this.activePlayer
        setTimeout(() => {
          alert(`Opps. Player ${activePlayer + 1} rolled to 1. Lost turn.`)
        }, 10)
        return this.nextPlayer()
      }
      this.rollingScore = this.rollingScore + dice1 + dice2
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

body {
  background-image: linear-gradient(
      rgba(62, 20, 20, 0.4),
      rgba(62, 20, 20, 0.4)
    ),
    url('/static/back.jpg');
  background-size: cover;
  background-position: center;
  font-family: Lato;
  font-weight: 300;
  position: relative;
  height: 100vh;
  color: #555;
}

.wrapper {
  width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>
