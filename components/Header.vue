<template>
  <div class="header">
    <div
      :class="{
        'header__start-mobile': isMobile,
        'header__start-desktop': !isMobile
      }"
    >
      <div class="header__start">
        <svg class="header__start-menu" viewBox="0 0 100 90" width="20" height="20">
          <rect width="100" height="16" rx="10" ry="10" />
          <rect y="34" width="100" height="16" rx="10" ry="10" />
          <rect y="68" width="100" height="16" rx="10" ry="10" />
        </svg>
      </div>
      <div class="header__center" :class="{'header__center_desktop': !isMobile}">
        Wordle Indonesia
      </div>
    </div>
    <div class="header__end">
      <svg
        v-if="showRetryButton"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="36"
        height="36"
        viewBox="-15 0 256 256"
        xml:space="preserve"
        class="header__end-retry game-icon"
        @click="retry"
      >
        <defs />
        <g
          style="
            stroke: none;
            stroke-width: 0;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: none;
            fill-rule: nonzero;
            opacity: 1;
          "
          transform="translate(94.07939893619192 1.4065934065933448) rotate(30) scale(2.06 2.06)"
        >
          <path
            d="M 75.702 53.014 c -2.142 7.995 -7.27 14.678 -14.439 18.816 c -7.168 4.138 -15.519 5.239 -23.514 3.095 c -16.505 -4.423 -26.335 -21.448 -21.913 -37.953 C 20.258 20.467 37.286 10.64 53.79 15.06 c 4.213 1.129 8.076 3.118 11.413 5.809 l -8.349 8.35 h 26.654 V 2.565 l -8.354 8.354 c -5.1 -4.405 -11.133 -7.61 -17.74 -9.381 C 33.451 -4.882 8.735 9.389 2.314 33.35 c -6.42 23.961 7.851 48.678 31.811 55.098 C 38.001 89.486 41.934 90 45.842 90 c 7.795 0 15.488 -2.044 22.42 -6.046 c 10.407 -6.008 17.851 -15.709 20.962 -27.317 L 75.702 53.014 z"
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: rgb(0, 0, 0);
              fill-rule: nonzero;
              opacity: 1;
            "
            transform=" matrix(1 0 0 1 0 0) "
            stroke-linecap="round"
          />
        </g>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="28"
        viewBox="4 4 24 24"
        width="28"
        class="header__end-help game-icon"
        data-testid="icon-help"
        @click="showHelpPopup"
      >
        <path
          fill="var(--black)"
          d="M14.8333 23H17.1666V20.6667H14.8333V23ZM15.9999 4.33334C9.55992 4.33334 4.33325 9.56001 4.33325 16C4.33325 22.44 9.55992 27.6667 15.9999 27.6667C22.4399 27.6667 27.6666 22.44 27.6666 16C27.6666 9.56001 22.4399 4.33334 15.9999 4.33334ZM15.9999 25.3333C10.8549 25.3333 6.66659 21.145 6.66659 16C6.66659 10.855 10.8549 6.66668 15.9999 6.66668C21.1449 6.66668 25.3333 10.855 25.3333 16C25.3333 21.145 21.1449 25.3333 15.9999 25.3333ZM15.9999 9.00001C13.4216 9.00001 11.3333 11.0883 11.3333 13.6667H13.6666C13.6666 12.3833 14.7166 11.3333 15.9999 11.3333C17.2833 11.3333 18.3333 12.3833 18.3333 13.6667C18.3333 16 14.8333 15.7083 14.8333 19.5H17.1666C17.1666 16.875 20.6666 16.5833 20.6666 13.6667C20.6666 11.0883 18.5783 9.00001 15.9999 9.00001Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="28"
        viewBox="4 4 24 24"
        width="28"
        class="header__end-settings game-icon"
        data-testid="icon-settings"
      >
        <path
          fill="var(--black)"
          d="M25.52 17.2534C25.5733 16.8534 25.6 16.44 25.6 16C25.6 15.5734 25.5733 15.1467 25.5067 14.7467L28.2133 12.64C28.4533 12.4534 28.52 12.0934 28.3733 11.8267L25.8133 7.40004C25.6533 7.10671 25.32 7.01338 25.0267 7.10671L21.84 8.38671C21.1733 7.88004 20.4667 7.45338 19.68 7.13338L19.2 3.74671C19.1467 3.42671 18.88 3.20004 18.56 3.20004H13.44C13.12 3.20004 12.8666 3.42671 12.8133 3.74671L12.3333 7.13338C11.5467 7.45338 10.8267 7.89338 10.1733 8.38671L6.98665 7.10671C6.69332 7.00004 6.35998 7.10671 6.19998 7.40004L3.65332 11.8267C3.49332 12.1067 3.54665 12.4534 3.81332 12.64L6.51998 14.7467C6.45332 15.1467 6.39998 15.5867 6.39998 16C6.39998 16.4134 6.42665 16.8534 6.49332 17.2534L3.78665 19.36C3.54665 19.5467 3.47998 19.9067 3.62665 20.1734L6.18665 24.6C6.34665 24.8934 6.67998 24.9867 6.97332 24.8934L10.16 23.6134C10.8267 24.12 11.5333 24.5467 12.32 24.8667L12.8 28.2534C12.8667 28.5734 13.12 28.8 13.44 28.8H18.56C18.88 28.8 19.1467 28.5734 19.1867 28.2534L19.6667 24.8667C20.4533 24.5467 21.1733 24.12 21.8267 23.6134L25.0133 24.8934C25.3067 25 25.64 24.8934 25.8 24.6L28.36 20.1734C28.52 19.88 28.4533 19.5467 28.2 19.36L25.52 17.2534ZM16 20.8C13.36 20.8 11.2 18.64 11.2 16C11.2 13.36 13.36 11.2 16 11.2C18.64 11.2 20.8 13.36 20.8 16C20.8 18.64 18.64 20.8 16 20.8Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    showRetryButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isRefresh: false,
      isMobile: false
    }
  },
  created () {
    this.isMobile = this.$mobileDetect.isPhoneSized()
  },
  methods: {
    showHelpPopup () {
      this.$emit('showHelpPopup')
    },
    retry () {
      window.location.reload(true)
    }
  }
}
</script>

<style>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0px 20px;
  height: 65px;
  color: var(--black);
  border-bottom: 1px solid var(--lightgrey);
}

.header__start {
  display: flex;
  align-self: center;
}

.header__start-mobile {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.header__start-desktop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 50%;
}

.header__start-menu {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.header__center {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 700;
}

.header__center_desktop {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translate(-50%, 0);
}

.header__end {
  display: flex;
  flex: 31%;
  justify-content: end;
  align-items: center;
  gap: 14px;
}

.header__end-help,
.header__end-settings,
.header__end-retry {
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .header {
    height: 52px;
    padding: 0px 16px;
  }

  .header__start-menu {
    width: 18px;
    height: 18px;
  }

  .header__center {
    font-size: 1.2rem;
    line-height: 1.2rem;
  }

  .header__center_desktop {
    top: 16px;
  }

  .header__end {
    flex: 0%;
    gap: 8px;
  }

  .header__end-help,
  .header__end-settings,
  .header__end-retry {
    width: 22px;
    height: 22px;
  }
}
</style>
