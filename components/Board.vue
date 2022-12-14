<template>
  <div>
    <ToastMessage v-if="showToast" :message="wording.toast.completed" />
    <div class="board">
      <div class="hidden-input">
        <input
          v-for="(nInput, i) in 6"
          :key="`board-input-${i}`"
          :ref="`word${i}`"
          v-model="word[i]"
          type="text"
          maxlength="5"
          :disabled="wordNumber >= 6"
          @keyup.enter="onEnter(word[i])"
          @keydown="restrictInput($event)"
          @focus="hideMobileKeyboard"
        >
      </div>
      <div
        v-for="(nRow, i) in 6"
        :key="`board-row-${i}`"
        class="board__row"
      >
        <div
          v-for="(nCol, j) in 5"
          :key="`board-box-${i}-${j}`"
          class="board__box"
          :class="{ 'board__box_filled': word[i][j] !== undefined }"
        >
          <span>
            {{ word[i][j] }}
          </span>
        </div>
      </div>
    </div>
    <div class="overlay" @click="focusInput()" />
  </div>
</template>

<script>
import ToastMessage from '@/components/ToastMessage.vue'

export default {
  name: 'BoardComponent',
  components: {
    ToastMessage
  },
  props: {
    wording: {
      type: Object,
      default () {
        return {}
      }
    },
    keyboardInput: {
      type: String,
      default: ''
    },
    wordList: {
      type: Array,
      default () {
        return []
      }
    },
    wordGuess: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      word: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''
      },
      wordNumber: 0,
      showToast: false
    }
  },
  watch: {
    keyboardInput (newLetter) {
      if (newLetter === 'enter') {
        this.onEnter(this.word[this.wordNumber])
      } else if (newLetter === 'del') {
        this.$store.commit('deleteKeyboardInput')
        this.$nextTick(() => {
          this.$refs[`word${this.wordNumber}`][0].value = this.$refs[`word${this.wordNumber}`][0].value.slice(0, -1)
          this.word[this.wordNumber] = this.word[this.wordNumber].slice(0, -1)
        })
      }
      if (this.wordNumber < 6) {
        if (
          this.word[this.wordNumber].length < 5 &&
          newLetter !== '' &&
          newLetter !== 'enter' &&
          newLetter !== 'del'
        ) {
          this.$nextTick(() => {
            this.$refs[`word${this.wordNumber}`][0].value += newLetter
            this.word[this.wordNumber] += newLetter
          })
        }
        this.focusInput(this.wordNumber)
        this.$store.commit('emptyKeyboardInput')
      }
    }
  },
  mounted () {
    this.focusInput(this.wordNumber)
    console.log(this.wordGuess)
  },
  methods: {
    hideMobileKeyboard () {
      if (this.$mobileDetect.isPhoneSized()) {
        document.activeElement.blur()
      }
    },
    focusInput () {
      if (this.wordNumber < 6) {
        this.$nextTick(() => {
          this.$refs[`word${this.wordNumber}`][0].focus()
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
        if (this.word[this.wordNumber].length === 5 && this.wordList.includes(word)) {
          let j = 0
          let timer = 0
          for (let i = (this.wordNumber * 5); i < ((this.wordNumber + 1) * 5); i++) {
            if (!this.wordGuess.toUpperCase().includes(word[j].toUpperCase())) {
              setTimeout(() => {
                document.getElementsByClassName('board__box')[i].classList.add('board__box_wrong')
              }, timer)
              this.$store.commit('addLetter', {
                label: 'wrong',
                value: word[j].toUpperCase()
              })
            }
            if (word[j].toUpperCase() === this.wordGuess[j].toUpperCase()) {
              setTimeout(() => {
                document.getElementsByClassName('board__box')[i].classList.add('board__box_correct')
              }, timer)
              this.$store.commit('addLetter', {
                label: 'correct',
                value: word[j].toUpperCase()
              })
            } else if (this.wordGuess.toUpperCase().includes(word[j].toUpperCase())) {
              let isDuplicate = false
              let isAlmost = false
              for (let k = j + 1; k < 5; k++) {
                if (word[j].toUpperCase() === word[k].toUpperCase()) {
                  if (word[k].toUpperCase() === this.wordGuess[k].toUpperCase()) {
                    setTimeout(() => {
                      document.getElementsByClassName('board__box')[i].classList.add('board__box_wrong')
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
                  if (word[k].toUpperCase() === this.wordGuess[k].toUpperCase()) {
                    setTimeout(() => {
                      document.getElementsByClassName('board__box')[i].classList.add('board__box_wrong')
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
                  document.getElementsByClassName('board__box')[i].classList.add('board__box_almost')
                }, timer)
                this.$store.commit('addLetter', {
                  label: 'almost',
                  value: word[j].toUpperCase()
                })
              }
            }
            j++
            timer += 500
          }
          if (word.toUpperCase() === this.wordGuess.toUpperCase()) {
            setTimeout(() => {
              this.showToast = true
            }, timer - 300)
            for (let i = (this.wordNumber * 5); i < ((this.wordNumber + 1) * 5); i++) {
              setTimeout(() => {
                document.getElementsByClassName('board__box')[i].classList.add('board__box_completed')
                this.$emit('showRetryButton')
              }, timer)
              timer += 300
            }
            setTimeout(() => {
              this.showToast = false
              this.wordNumber = 6
            }, timer + 1000)
          } else {
            this.wordNumber += 1
            if (this.wordNumber === 6) {
              setTimeout(() => {
                this.$emit('showRetryPopup')
              }, timer)
              timer += 300
            }
          }
          this.focusInput(this.wordNumber)
        } else {
          document.getElementsByClassName('board__row')[this.wordNumber].classList.add('board__row_incorrect')
          setTimeout(() => {
            document.getElementsByClassName('board__row')[this.wordNumber].classList.remove('board__row_incorrect')
          }, 900)
        }
      }
    }
  }
}
</script>

<style>
.board {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 8%);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hidden-input {
  position: absolute;
  opacity: 0;
}

.board__row {
  display: flex;
  gap: 5px;
}

.board__row_incorrect {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}

.board__box {
  width: 62px;
  aspect-ratio: 1;
  border: 2px solid var(--lightgrey);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 600;
  text-transform: uppercase;
}

.board__box_filled {
  border: 2px solid var(--darkgrey);
  animation: pop 0.1s linear;
}

.board__box_wrong,
.board__box_almost,
.board__box_correct {
  transform: rotateX(0.5turn);
  transition: transform 0.7s;
  transform-style: preserve-3d;
  transition-timing-function: linear;
  color: var(--white);
}

.board__box_wrong {
  border: 2px solid var(--grey);
  background-color: var(--grey);
}

.board__box_almost {
  border: 2px solid var(--yellow);
  background-color: var(--yellow);
}

.board__box_correct {
  border: 2px solid var(--green);
  background-color: var(--green);
}

.board__box_wrong > span,
.board__box_almost > span,
.board__box_correct > span {
  transform: rotateX(-0.5turn);
}

.board__box_completed {
  animation: jump 0.8s linear;
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

@keyframes jump {
    0% { transform: translate(0%, 0%) rotateX(-0.5turn)}
    50% { transform: translate(0%, -30%) rotateX(-0.5turn)}
    100% { transform: translate(0%, 0%) rotateX(-0.5turn)}
}

@media only screen and (max-width: 768px) {
  .board {
    top: 60px;
  }
  .board__box {
    width: 58px;
    aspect-ratio: 1;
  }
}

@media only screen and (max-width: 391px) {
  .board__box {
    width: 48px;
    aspect-ratio: 1;
  }
}
</style>
