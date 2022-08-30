export const state = () => ({
  isMobile: false,
  keyboardInput: '',
  letter: {
    wrong: [],
    almost: [],
    correct: []
  }
})

export const mutations = {
  setDevice (state, value) {
    state.isMobile = value
  },
  setKeyboardInput (state, value) {
    state.keyboardInput = value
  },
  emptyKeyboardInput (state) {
    state.keyboardInput = ''
  },
  deleteKeyboardInput (state) {
    state.keyboardInput = state.keyboardInput.slice(0, -1)
  },
  addLetter (state, { label, value }) {
    if (!state.letter[label].includes(value)) {
      state.letter[label].push(value)
    }
  }
}
