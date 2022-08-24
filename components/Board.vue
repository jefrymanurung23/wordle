<template>
  <div class="container">
    <div class="hidden-input">
      <input
        v-for="(nInput, i) in 6"
        :key="`input-${i}`"
        :ref="`word${i}`"
        v-model="word[i]"
        type="text"
        maxlength="5"
        @keyup.enter="onEnter(word[i])"
        @keydown="restrictInput($event)"
        :disabled="wordNumber >= 6"
      >
    </div>
    <div
      v-for="(nRow, j) in 6"
      :key="`row-${j}`"
      class="row"
    >
      <div
        v-for="(nCol, k) in 5"
        :key="`box-${j}-${k}`"
        class="box"
        :class="{ 'box__filled': word[j][k] !== undefined }"
      >
        <span>
          {{ word[j][k] }}
        </span>
      </div>
    </div>
    <div class="overlay" @click="focusInput(wordNumber)" />
  </div>
</template>

<script>
import wordlist from '@/static/data/wordlist.json'

export default {
  name: 'BoardComponent',
  data () {
    return {
      word: ['', '', '', '', '', ''],
      wordNumber: 0
    }
  },
  computed: {
    getWordGuess () {
      return wordlist[Math.floor(Math.random() * wordlist.length)]
    },
    getWordlist () {
      return wordlist
    }
  },
  mounted () {
    this.focusInput(this.wordNumber)
  },
  methods: {
    focusInput (number) {
      if (number < 6) {
        this.$nextTick(() => {
          this.$refs[`word${number}`][0].focus()
        })
      }
    },
    restrictInput (e) {
      if (/[^A-Za-z]/g.test(e.key)) {
        e.preventDefault()
      }
    },
    onEnter (word) {
      if (this.wordNumber < 6) {
        if (this.word[this.wordNumber].length === 5 && this.getWordlist.includes(word)) {
          let j = 0
          let timer = 0
          for (let i = (this.wordNumber * 5); i < ((this.wordNumber + 1) * 5); i++) {
            if (!this.getWordGuess.toUpperCase().includes(word[j].toUpperCase())) {
              setTimeout(() => {
                document.getElementsByClassName('box')[i].classList.add('box__wrong')
              }, timer)
            }
            if (word[j].toUpperCase() === this.getWordGuess[j].toUpperCase()) {
              setTimeout(() => {
                document.getElementsByClassName('box')[i].classList.add('box__correct')
              }, timer)
            } else if (this.getWordGuess.toUpperCase().includes(word[j].toUpperCase())) {
              let isDuplicate = false
              let isAlmost = false
              for (let k = j + 1; k < 5; k++) {
                if (word[j].toUpperCase() === word[k].toUpperCase()) {
                  if (word[k].toUpperCase() === this.getWordGuess[k].toUpperCase()) {
                    setTimeout(() => {
                      document.getElementsByClassName('box')[i].classList.add('box__wrong')
                    }, timer)
                    isDuplicate = true
                    break
                  } else {
                    isAlmost = true
                  }
                } else {
                  isAlmost = true
                }
              }
              for (let k = j - 1; k >= 0; k--) {
                if (word[j].toUpperCase() === word[k].toUpperCase()) {
                  if (word[k].toUpperCase() === this.getWordGuess[k].toUpperCase()) {
                    setTimeout(() => {
                      document.getElementsByClassName('box')[i].classList.add('box__wrong')
                    }, timer)
                    isDuplicate = true
                    break
                  } else {
                    isAlmost = true
                  }
                } else {
                  isAlmost = true
                }
              }
              if (!isDuplicate && isAlmost) {
                setTimeout(() => {
                  document.getElementsByClassName('box')[i].classList.add('box__almost')
                }, timer)
              }
            }
            j++
            timer += 500
          }
          if (word.toUpperCase() === this.getWordGuess.toUpperCase()) {
            this.wordNumber = 6
          } else {
            this.wordNumber += 1
          }
          this.focusInput(this.wordNumber)
        } else {
          document.getElementsByClassName('row')[this.wordNumber].classList.add('row__incorrect')
          setTimeout(() => {
            document.getElementsByClassName('row')[this.wordNumber].classList.remove('row__incorrect')
          }, 900)
        }
      }
    }
  }
}
</script>

<style>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
}

.hidden-input {
  position: absolute;
  opacity: 0;
}

.row {
  display: flex;
  gap: 5px;
}

.row__incorrect {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}

.box {
  width: 62px;
  aspect-ratio: 1;
  border: 2px solid #d3d6da;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  text-transform: uppercase;
}

.box__filled {
  border: 2px solid #878a8c;
  animation: pop 0.1s linear;
}

.box__wrong {
  border: 2px solid #787c7e;
  background-color: #787c7e;
  transform: rotateX(0.5turn);
  transition: transform 0.7s;
  transform-style: preserve-3d;
  transition-timing-function: linear;
  color: #ffffff;
}

.box__almost {
  border: 2px solid #c9b458;
  background-color: #c9b458;
  transform: rotateX(0.5turn);
  transition: transform 0.7s;
  transform-style: preserve-3d;
  transition-timing-function: linear;
  color: #ffffff;
}

.box__correct {
  border: 2px solid #6aaa64;
  background-color: #6aaa64;
  transform: rotateX(0.5turn);
  transition: transform 0.7s;
  transform-style: preserve-3d;
  transition-timing-function: linear;
  color: #ffffff;
}

.box__almost > span,
.box__correct > span,
.box__wrong > span {
  transform: rotateX(-0.5turn);
}

.overlay {
  height: 100vh;
  width: 100vw;
  position: fixed;
}

@keyframes pop{
  50% {
    transform: scale(1.2);
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>
