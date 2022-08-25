export const state = () => ({
  device: {},
  keyboardInput: ''
})

export const mutations = {
  setDevice (state, value) {
    state.device = value
  },
  setKeyboardInput (state, value) {
    state.keyboardInput = value
  },
  emptyKeyboardInput (state) {
    state.keyboardInput = ''
  },
  deleteKeyboardInput (state) {
    state.keyboardInput = state.keyboardInput.slice(0, -1)
  }
}
