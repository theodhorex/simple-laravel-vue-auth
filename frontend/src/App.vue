<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="container">
        <Navbar v-if="!isLoginUrl" />
      </div>
    </div>
    <RouterView />
  </header>
</template>

<script scoped>
export default {
  data() {
    return {
      isLoginUrl: false
    }
  },
  created() {
    this.checkLoginUrl()
  },
  methods: {
    checkLoginUrl() {
      const currUrl = window.location.href
      this.isLoginUrl = currUrl.indexOf('login') !== -1 || currUrl.indexOf('register') !== -1
    }
  }
}
</script>
