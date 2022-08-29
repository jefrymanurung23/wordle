<template>
  <div class="popup" @click.self="closeRetryPopup">
    <div class="popup__container">
      <div class="popup__container-close" @click="closeRetryPopup">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          class="game-icon"
          data-testid="icon-close"
        >
          <path
            fill="var(--black)"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </div>
      <div class="popup__container-instructions">
        <p>Kamu <strong>gagal</strong> menebak 😢. Kata yang harus ditebak adalah :</p>
        <div class="popup__container-examples">
          <div class="popup__container-examples-row">
            <div
              v-for="(w, i) in wordGuess"
              :key="`examples-correct-box-${i}`"
              class="popup__container-examples-box_correct"
            >
              {{ w }}
            </div>
          </div>
        </div>
        <div class="popup__container-action">
          <div class="btn btn-retry" @click="retry">
            COBA LAGI
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpPopup',
  props: {
    wordGuess: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeRetryPopup () {
      document.getElementsByClassName('popup')[0].classList.add('popup_close')
      document.getElementsByClassName('popup__container')[0].classList.add('popup__container_close')
      this.$emit('showRetry')
      this.$emit('closeRetryPopup')
    },
    retry () {
      window.location.reload(true)
    }
  }
}
</script>

<style scoped>
.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadein .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
}

.popup_close {
  animation: fadeout .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
}

.popup__container {
  width: 90%;
  max-width: 500px;
  max-height: 90%;
  position: relative;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: 0 4px 23px 0 var(--black-20);
  overflow-y: auto;
  padding: 24px;
  font-size: .8rem;
  box-sizing: border-box;
  opacity:0;
  animation: scaleup .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
}

.popup__container_close,
.popup__container-mobile_close {
  animation: scaledown .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
}

.popup__container-close {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
}

.popup__container_instructions p {
  margin: 0;
}

.popup__container-examples {
  margin-top: 8px;
}

.popup__container-examples-row {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.popup__container-examples-box_correct {
  width: 35px;
  height: 35px;
  text-transform: uppercase;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 600;
  background-color: var(--green);
  border: 2px solid var(--green);
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup__container-action {
  display: flex;
  justify-content: flex-end;
}

.btn {
  margin-top: 32px;
  width: 128px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 0.8rem;
  line-height: 0.8rem;
  font-weight: 500;
  user-select: none;
}

.btn:hover {
  background-color: var(--darkgreen);
}

.btn-retry {
  background-color: var(--green);
  color: var(--white);
}

@keyframes fadein {
  0% {
    background: var(--white-100);
  }
  100% {
    background: var(--white-50);
  }
}

@keyframes fadeout {
  0% {
    background: var(--white-50);
  }
  100% {
    background: var(--white-100);
  }
}

@keyframes scaleup {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes scaledown {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
}

@media only screen and (max-width: 768px) {
  .popup__container-examples-box_correct {
    width: 30px;
    height: 30px;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
}
</style>
