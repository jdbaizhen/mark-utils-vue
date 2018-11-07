<template>
  <div id="app">
    <header>
      <router-link to="/">version1.0</router-link>
      <router-link to="/markpage">version2.0</router-link>
    </header>
    <transition name="marks" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    margin: 0px;
  }
  #app {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  header {
    height: 50px;
    line-height: 50px;
  }
  .marks-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  .marks-enter-active, .marks-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .marks-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  .marks-enter-to, .marks-leave {
    opacity: 1;
  }
</style>
