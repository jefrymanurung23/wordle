<template>
  <div>
    <Header @showHelpPopup="showHelpPopup = true" />
    <Board :wording="wording" :keyboard-input="getKeyboardInput" />
    <VirtualKeyboard />
    <HelpPopup v-if="showHelpPopup" @closeHelpPopup="closeHelpPopup" />
  </div>
</template>

<script>
import id from '@/static/data/lang/id.json'
import Header from '~/components/Header.vue'
import Board from '~/components/Board.vue'
import VirtualKeyboard from '~/components/VirtualKeyboard.vue'
import HelpPopup from '~/components/HelpPopup.vue'

export default {
  name: 'IndexPage',
  components: {
    Header,
    Board,
    VirtualKeyboard,
    HelpPopup
  },
  data () {
    return {
      showHelpPopup: false
    }
  },
  computed: {
    wording () {
      return id
    },
    getKeyboardInput () {
      return this.$store.state.keyboardInput
    }
  },
  methods: {
    closeHelpPopup () {
      setTimeout(() => {
        this.showHelpPopup = false
      }, 500)
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
