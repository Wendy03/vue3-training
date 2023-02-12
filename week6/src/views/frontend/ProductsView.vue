<template>
  <div class="mt-5">
    <VueLoading v-model:active="isLoading"></VueLoading>
    <div class="row">
      <ProductCategory></ProductCategory>
      <ProductList></ProductList>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import productsStore from '../../stores/frontend/productsStore';
import statusStore from '../../stores/statusStore';
import ProductCategory from '../../components/frontend/ProductCategory.vue';
import ProductList from '../../components/frontend/ProductList.vue';

export default {
  data() {
    return {};
  },
  components: { ProductCategory, ProductList },
  methods: {
    ...mapActions(productsStore, ['getProducts', 'changeCategory']),
  },
  computed: {
    ...mapState(productsStore, [
      'products',
      'categories',
      'filterProducts',
      'filterCategory',
    ]),
    ...mapState(statusStore, ['isLoading', 'loadingItem']),
  },
  mounted() {
    this.getProducts();
  },
};
</script>
