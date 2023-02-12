<template>
  <div>
     <div class="text-end mt-4">
        <button
          class="btn btn-primary"
          :disabled="isProcessing"
        >
          建立新的產品
        </button>
      </div>
      <div class="table-responsive">
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.category }}</td>
              <td>{{ product.title }}</td>
              <td class="text-end">{{ product.origin_price }}</td>
              <td class="text-end">{{ product.price }}</td>
              <td>
                <span :class="{ 'text-success': product.is_enabled }">{{
                  product.is_enabled ? "啟用" : "未啟用"
                }}</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    :disabled="isProcessing"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    :disabled="isProcessing"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import adminProductsStore from '../../stores/backend/adminProductsStore';
import statusStore from '../../stores/statusStore';

export default {
  data() {
    return {};
  },
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
