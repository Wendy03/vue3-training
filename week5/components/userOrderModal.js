import { Toast } from '../../js/helper.js';
import { apiUrl, apiPath } from '../../js/config.js';

export default {
  template: '#userOrderModal',
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      orderModal: {},
      status: {
        isProcessing: false,
      },
    };
  },
  mounted() {
    this.orderModal = new bootstrap.Modal(this.$refs.modal);
  },
  methods: {
    showModal() {
      this.orderModal.show();
    },
    hideModal() {
      this.productModal.hide();
    },
    createOrder() {
      this.status.isProcessing = true;
      this.orderModal.hide();
      const order = this.form;
      axios
        .post(`${apiUrl}/api/${apiPath}/order`, { data: order })
        .then((res) => {
          const { message } = res.data;
          this.status.isProcessing = false;
          this.$refs.form.resetForm();
          Toast.fire({
            title: `${message}`,
            icon: 'success',
          });
          this.$emit('update-carts');
          this.$emit('update-products');
        })
        .catch((_err) => {
          this.status.isProcessing = false;
          Toast.fire({
            title: '無法新增資料，稍後再試',
            icon: 'error',
          });
        });
    },
   
  },
};
