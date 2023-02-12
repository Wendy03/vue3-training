<template>
  <div class="mt-5">
    <VueLoading v-model:active="isLoading"></VueLoading>
    <div class="container py-5">
      <AdminProducts></AdminProducts>
      <AdminPagination :pages="pagination" @change-page="getProducts"></AdminPagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import adminProductsStore from '../../stores/backend/adminProductsStore';
import statusStore from '../../stores/statusStore';
import AdminPagination from '../../components/backend/AdminPagination.vue';
import AdminProducts from '../../components/backend/AdminProducts.vue';

export default {
  data() {
    return {};
  },
  components: { AdminPagination, AdminProducts },
  methods: {
    ...mapActions(adminProductsStore, ['getProducts']),
  },
  computed: {
    ...mapState(adminProductsStore, ['products', 'pagination']),
    ...mapState(statusStore, ['isLoading', 'isProcessing']),
  },
  mounted() {
    this.getProducts();
  },
};
</script>
