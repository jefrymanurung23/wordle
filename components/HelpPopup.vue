<template>
  <div class="popup" @click.self="closeHelpPopup">
    <div class="popup__container">
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
        </div>
        <p>Kamu bisa bermain terus sesukamu tanpa harus menunggu hari esok. Setiap permainan akan berisi kata acak yang bisa kamu tebak.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpPopup',
  methods: {
    closeHelpPopup () {
      this.$emit('closeHelpPopup')
    }
  }
}
</script>

<style>
.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white-50);
  z-index: 100;
}

.popup__container {
  width: 90%;
  max-width: 500px;
  max-height: 80%;
  position: relative;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: 0 4px 23px 0 var(--black-20);
  overflow-y: auto;
  padding: 16px;
  box-sizing: border-box;
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
</style>
