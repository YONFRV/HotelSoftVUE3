<script setup>
import { ref } from 'vue';

const currentDate = ref(new Date().getFullYear());
</script>
<template>
<footer class="bg-light text-center text-lg-start ">
  <div class="text-center p-3"  >
    © {{ currentDate }} Copyright:
    <a class="text-dark" href="">IT BUSINESS & FINANCES COLOMBIA @YonFrv</a>
  </div>
</footer>
</template>
 