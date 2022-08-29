<template>
  <div class="keyboard">
    <div v-for="(r, i) in getKeyboard" :key="`keyboard-row-${i}`" class="keyboard__row">
      <div
        v-for="(k, j) in r"
        :key="`keyboard-label-${j}`"
        class="keyboard__label"
        :class="{
          'keyboard__label-enter': k === 'enter',
          'keyboard__label-del': k === 'del',
          'keyboard__label_wrong': getWrongLetter.includes(k.toUpperCase()),
          'keyboard__label_almost': getAlmostLetter.includes(k.toUpperCase()),
          'keyboard__label_correct': getCorrectLetter.includes(k.toUpperCase()),
        }"
        @click="handleKeyboard(k)"
      >
        {{ k !== 'del' ? k : '' }}
        <svg
          v-if="k === 'del'"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          class="game-icon"
          data-testid="icon-backspace"
        >
          <path
            fill="var(--color-tone-1)"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import keyboard from '@/static/data/keyboard.json'

export default {
  name: 'VirtualKeyboard',
  computed: {
    getKeyboard () {
      return keyboard
    },
    getWrongLetter () {
      return this.$store.state.letter.wrong
    },
    getAlmostLetter () {
      return this.$store.state.letter.almost
    },
    getCorrectLetter () {
      return this.$store.state.letter.correct
    }
  },
  methods: {
    handleKeyboard (letter) {
      this.$store.commit('setKeyboardInput', letter)
    }
  }
}
</script>

<style>
.keyboard {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.keyboard__row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
}

.keyboard__label {
  width: 42px;
  height: 58px;
  background-color: var(--lightgrey);
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 0.85rem;
  border-radius: 10%;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select:none;
  -webkit-user-select:none;
  -moz-user-select:none;
}

.keyboard__label_wrong {
  background-color: var(--grey);
  color: var(--white);
}

.keyboard__label_almost {
  background-color: var(--yellow);
  color: var(--white);
}

.keyboard__label_correct {
  background-color: var(--green);
  color: var(--white);
}

.keyboard__label-enter,
.keyboard__label-del {
  width: 65px;
}

@media only screen and (max-width: 768px) {
  .keyboard {
    gap: 8px;
  }

  .keyboard__label {
    width: 33px;
  }

  .keyboard__label-enter,
  .keyboard__label-del {
    width: 52px;
  }
}
</style>
