<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Collapsible />
    <UserAddress />
  </div>
</template>

<script>
import Collapsible from './components/Collapsible.vue'
import UserAddress from './components/UserAddress.vue'

export default {
  name: 'App',
  components: {
    Collapsible,
    UserAddress,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
