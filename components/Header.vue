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
      <div class="header__center">
        Wordle Indonesia
      </div>
    </div>
    <div class="header__end">
      <svg class="header__start-menu" viewBox="0 0 100 90" width="20" height="20">
        <rect width="100" height="16" rx="10" ry="10" />
        <rect y="34" width="100" height="16" rx="10" ry="10" />
        <rect y="68" width="100" height="16" rx="10" ry="10" />
      </svg>
      <svg class="header__start-menu" viewBox="0 0 100 90" width="20" height="20">
        <rect width="100" height="16" rx="10" ry="10" />
        <rect y="34" width="100" height="16" rx="10" ry="10" />
        <rect y="68" width="100" height="16" rx="10" ry="10" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  computed: {
    isMobile () {
      return this.$store.state.device.isMobile
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
}

.header__center {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 700;
}

.header__end {
  display: flex;
  flex: 31%;
  justify-content: end;
  gap: 14px;
}

@media only screen and (max-width: 768px) {
  .header {
    height: 40px;
    padding: 0px 16px;
  }

  .header__start-menu {
    width: 18px;
    height: 18px;
  }

  .header__center {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }

  .header__end {
    flex: 0%;
    gap: 8px;
  }

}
</style>
