<template>
  <div>
    <Header />
    <Board :wording="wording" :keyboard-input="getKeyboardInput" />
    <VirtualKeyboard />
  </div>
</template>

<script>
import id from '@/static/data/lang/id.json'
import Header from '~/components/Header.vue'
import Board from '~/components/Board.vue'
import VirtualKeyboard from '~/components/VirtualKeyboard.vue'

export default {
  name: 'IndexPage',
  components: {
    Header,
    Board,
    VirtualKeyboard
  },
  computed: {
    wording () {
      return id
    },
    getKeyboardInput () {
      return this.$store.state.keyboardInput
    }
  }
}
</script>

<style>
body, html {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
