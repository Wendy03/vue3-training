<template>
  <div>
    <VueLoading v-model:active="isLoading"></VueLoading>
    <ProductDetail> </ProductDetail>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import ProductDetail from '../../components/frontend/ProductDetail.vue';
import statusStore from '../../stores/statusStore';

export default {
  data() {
    return {};
  },
  components: { ProductDetail },
  computed: {
    ...mapState(statusStore, ['isLoading']),
  },
};
</script>
