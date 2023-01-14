import { Toast } from '../../js/helper.js';
import { apiUrl, apiPath } from '../../js/config.js';

export default {
  template: `
  <div
  id="delProductModal"
  ref="delProductModal"
  class="modal fade"
  tabindex="-1"
  aria-labelledby="delProductModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="delProductModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{ product.title }}</strong>
        商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal"
        >
          取消
        </button>
        <button
          type="button"
          class="btn btn-danger"
          :disabled = "isProcessing"
          @click.prevent="delProduct"
        >
          確認刪除
        </button>
      </div>
    </div>
  </div>
</div>`,
  props: ['product'],
  data() {
    return {
      isProcessing: false,
    };
  },
  methods: {
    delProduct() {
      axios
        .delete(`${apiUrl}/api/${apiPath}/admin/product/${this.product.id}`)
        .then((res) => {
          Toast.fire({
            title: `${res.data.message}`,
            icon: 'success',
          });
          this.isProcessing = true;
          this.$emit('close', 'delData');
          this.$emit('update');
        })
        .catch((err) => {
          const errMessage = err.response
            ? err.response.data.message
            : err.data?.message;
          Toast.fire({
            title: `${errMessage}`,
            icon: 'error',
          });
        });
    },
  },
};
