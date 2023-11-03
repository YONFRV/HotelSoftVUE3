<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/MyComponents/Nav.vue'
import Footer from './components/MyComponents/Footer.vue'

</script>

<template>
  <Nav></Nav>
  <div class="container-fluid mt-3 ">
    <RouterView />  
  </div> 
  <Footer class="fixed-bottom"></Footer>
</template>
