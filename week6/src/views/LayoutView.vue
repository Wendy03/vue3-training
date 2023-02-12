<template>
  <div class="container py-3">
    <NavBar></NavBar>
    <div class="container">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import NavBar from '../components/frontend/NavBar.vue';

export default {
  data() {
    return {};
  },
  components: { RouterView, NavBar },
};
</script>
