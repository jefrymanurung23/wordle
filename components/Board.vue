<!-- Please remove this file from your project -->
<template>
  <div class="container">
    <div class="hidden-input">
      <input
        v-for="(nInput, i) in 5"
        :key="`input-${i}`"
        :ref="`word${i}`"
        v-model="word[i]"
        type="text"
        maxlength="5"
        @keyup.enter="onEnter"
        @keydown="restrictInput($event)"
      >
    </div>
    <div v-for="(nRow, j) in 5" :key="`row-${j}`" class="row">
      <div v-for="(nCol, k) in 5" :key="`box-${j}-${k}`" class="box">
        {{ word[j][k] }}
      </div>
    </div>
    <div class="overlay" @click="focusInput(wordNumber)" />
  </div>
</template>

<script>
export default {
  name: 'BoardComponent',
  data () {
    return {
      word: ['', '', '', '', ''],
      wordNumber: 0
    }
  },
  mounted () {
    this.focusInput(this.wordNumber)
  },
  methods: {
    focusInput (number) {
      this.$nextTick(() => {
        this.$refs[`word${number}`][0].focus()
      })
    },
    restrictInput (e) {
      if (/[^A-Za-z]/g.test(e.key)) {
        e.preventDefault()
      }
    },
    onEnter () {
      if (this.wordNumber !== 4) {
        if (this.word[this.wordNumber].length === 5) {
          this.wordNumber += 1
          this.focusInput(this.wordNumber)
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

.overlay {
  height: 100vh;
  width: 100vw;
  position: fixed;
}

</style>
