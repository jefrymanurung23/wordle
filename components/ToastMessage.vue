<template>
  <div class="toast">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'ToastMessage',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.toast {
  max-width: 367px;
  padding: 16px;
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: var(--green);
  color: var(--white);
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1rem;
  z-index: 10;
  animation: fadein 0.8s, fadeout 0.8s 2s;
  -webkit-animation: fadein 0.8s, fadeout 0.8s 2s;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

@-webkit-keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 50px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 50px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    top: 50px;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    top: 50px;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}
</style>
