<template>
  <div class="keyboard">
    <div v-for="(r, i) in getKeyboard" :key="`keyboard-row-${i}`" class="keyboard__row">
      <div
        v-for="(k, j) in r"
        :key="`keyboard-label-${j}`"
        class="keyboard__label"
        :class="{
          'keyboard__label-enter': k === 'enter',
          'keyboard__label-del': k === 'del'
        }"
        @click="handleKeyboard(k)"
      >
        {{ k }}
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
