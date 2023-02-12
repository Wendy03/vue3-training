<template>
  <div>
    <RouterLink to="/">回到前台</RouterLink> |
    <a href="#" @click.prevent="logout">登出</a>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {};
  },
  components: { RouterLink },
  methods: {
    logout() {
      document.cookie = 'hexToken=; expires=; path=/';
      this.$router.push('/');
    },
  },
};
</script>
