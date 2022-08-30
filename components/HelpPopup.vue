<template>
  <div class="popup" @click.self="closeHelpPopup">
    <div
      :class="{
        'popup__container-mobile': isMobile,
        'popup__container': !isMobile
      }"
    >
      <div class="popup__container-close" @click="closeHelpPopup">
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
      <div class="popup__container-title">
        Cara Bermain
      </div>
      <div class="popup__container-instructions">
        <p>Tebak <strong>WORDLE</strong> dalam 6 percobaan.</p>
        <p>Setiap tebakan harus berupa kata dengan 5 huruf yang valid. Tekan tombol enter untuk mengirimkan.</p>
        <p>Setelah menebak, warna kotak akan berubah untuk menunjukkan seberapa dekat tebakan Anda dengan kata tersebut.</p>
        <div class="popup__container-examples">
          <p><strong>Examples</strong></p>
          <div class="popup__container-examples-row">
            <div
              v-for="(c, i) in 'makan'"
              :key="`examples-correct-box-${i}`"
              class="popup__container-examples-box_correct"
            >
              {{ c }}
            </div>
          </div>
          <p>Huruf <strong>M</strong> ada dalam kata yang harus ditebak dan berada di posisi yang benar.</p>
          <div class="popup__container-examples-row">
            <div
              v-for="(a, i) in 'tidur'"
              :key="`examples-almost-box-${i}`"
              class="popup__container-examples-box_almost"
            >
              {{ a }}
            </div>
          </div>
          <p>Huruf <strong>I</strong> ada dalam kata yang harus ditebak tapi berada di posisi yang salah.</p>
          <div class="popup__container-examples-row">
            <div
              v-for="(w, i) in 'minum'"
              :key="`examples-wrong-box-${i}`"
              class="popup__container-examples-box_wrong"
            >
              {{ w }}
            </div>
          </div>
          <p>Huruf <strong>U</strong> tidak ada dalam kata yang harus ditebak.</p>
        </div>
        <p>Kamu bisa bermain terus sesukamu tanpa harus menunggu hari esok. Setiap permainan akan berisi kata acak yang bisa kamu tebak.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpPopup',
  data () {
    return {
      isMobile: false
    }
  },
  created () {
    this.isMobile = this.$mobileDetect.isPhoneSized()
  },
  methods: {
    closeHelpPopup () {
      document.getElementsByClassName('popup')[0].classList.add('popup_close')
      if (this.$mobileDetect.isPhoneSized()) {
        document.getElementsByClassName('popup__container-mobile')[0].classList.add('popup__container-mobile_close')
      } else {
        document.getElementsByClassName('popup__container')[0].classList.add('popup__container_close')
      }
      this.$emit('closeHelpPopup')
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

.popup__container-mobile {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  font-size: .85rem;
  background-color: var(--white);
  padding: 16px;
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

.popup__container-title {
  text-align: center;
  text-transform: uppercase;
  font-size: 1.2rem;
  line-height: 1.2rem;
  font-weight: 600;
}

.popup__container-instructions {
  margin-top: 32px;
}

.popup__container-examples {
  border-bottom: 1px solid var(--lightgrey);
  border-top: 1px solid var(--lightgrey);
}

.popup__container-examples-row {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.popup__container-examples-box_correct,
.popup__container-examples-box_almost,
.popup__container-examples-box_wrong {
  width: 35px;
  height: 35px;
  text-transform: uppercase;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 600;
  border: 2px solid var(--darkgrey);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup__container-examples-box_correct:nth-child(1) {
  background-color: var(--green);
  border: 2px solid var(--green);
  color: var(--white);
}

.popup__container-examples-box_almost:nth-child(2) {
  background-color: var(--yellow);
  border: 2px solid var(--yellow);
  color: var(--white);
}

.popup__container-examples-box_wrong:nth-child(4) {
  background-color: var(--grey);
  border: 2px solid var(--grey);
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
  .popup__container-title {
    margin-top: 25px;
  }

  .popup__container-close {
    top: 38px;
  }

  .popup__container-examples-box_correct,
  .popup__container-examples-box_almost,
  .popup__container-examples-box_wrong {
    width: 30px;
    height: 30px;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
}
</style>
