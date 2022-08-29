<template>
  <div>
    <Header
      :show-retry="showRetry"
      @showHelpPopup="showHelpPopup = true"
    />
    <Board
      :wording="wording"
      :keyboard-input="getKeyboardInput"
      :word-list="getWordlist"
      :word-guess="getWordGuess"
      @showRetryPopup="showRetryPopup = true"
    />
    <VirtualKeyboard />
    <HelpPopup
      v-if="showHelpPopup"
      @closeHelpPopup="closeHelpPopup"
    />
    <RetryPopup
      v-if="showRetryPopup"
      :word-guess="getWordGuess"
      @closeRetryPopup="closeRetryPopup"
      @showRetry="showRetry = true"
    />
  </div>
</template>

<script>
import wordlist from '@/static/data/wordlist.json'
import id from '@/static/data/lang/id.json'
import Header from '~/components/Header.vue'
import Board from '~/components/Board.vue'
import VirtualKeyboard from '~/components/VirtualKeyboard.vue'
import HelpPopup from '~/components/HelpPopup.vue'
import RetryPopup from '~/components/RetryPopup.vue'

export default {
  name: 'IndexPage',
  components: {
    Header,
    Board,
    VirtualKeyboard,
    HelpPopup,
    RetryPopup
  },
  data () {
    return {
      showHelpPopup: false,
      showRetryPopup: false,
      showRetry: false
    }
  },
  computed: {
    wording () {
      return id
    },
    getKeyboardInput () {
      return this.$store.state.keyboardInput
    },
    getWordlist () {
      return wordlist
    },
    getWordGuess () {
      return wordlist[Math.floor(Math.random() * wordlist.length)]
    }
  },
  methods: {
    closeHelpPopup () {
      setTimeout(() => {
        this.showHelpPopup = false
      }, 500)
    },
    closeRetryPopup () {
      setTimeout(() => {
        this.showRetryPopup = false
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
