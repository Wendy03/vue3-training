<template>
  <div class="container py-3">
    <AdminNavbar></AdminNavbar>
    <h2 class="mt-5">後台管理</h2>
    <RouterView v-if="isAuth"></RouterView>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Toast from '../utils/Toast';
import AdminNavbar from '../components/backend/AdminNavbar.vue';

const { VITE_API } = import.meta.env;

export default {
  data() {
    return {
      isAuth: false,
    };
  },
  components: { RouterView, AdminNavbar },
  methods: {
    checkAdmin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        this.$http
          .post(`${VITE_API}/api/user/check`)
          .then(() => {
            this.isAuth = true;
          })
          .catch((err) => {
            const errMessage = err.data?.message || '沒有權限，請登入';
            this.isProcessing = false;
            Toast.fire({
              title: `${errMessage}`,
              icon: 'error',
            });
          });
      } else {
        this.$router.push('login');
      }
    },
  },
  mounted() {
    this.checkAdmin();
  },
};
</script>
