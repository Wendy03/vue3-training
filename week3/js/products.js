import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { Toast } from '../../js/helper.js';
import { apiUrl, apiPath } from '../../js/config.js';

const app = createApp({
  data() {
    return {
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      productModal: '',
      delProductModal: '',
      isLoading: true,
      isProcessing: true,
    };
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
    this.productModal = new bootstrap.Modal(this.$refs.productModal);
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${apiUrl}/api/user/check`)
        .then((_res) => {
          this.getProducts();
        })
        .catch((err) => {
          const errMessage = err.response
            ? err.response.data.message
            : err.data?.message;
          Toast.fire({
            title: `${errMessage}`,
            icon: 'error',
          });
          window.location = 'login.html';
        });
    },
    getProducts() {
      axios
        .get(`${apiUrl}/api/${apiPath}/admin/products`)
        .then((res) => {
          this.isLoading = false;
          this.isProcessing = false;
          this.products = res.data.products;
        })
        .catch((err) => {
          const errMessage = err.response
            ? err.response.data.message
            : err.data?.message;
          this.isLoading = false;
          Toast.fire({
            title: `${errMessage}`,
            icon: 'error',
          });
        });
    },
    openModal(type, item) {
      if (type === 'new') {
        this.isNew = true;
        this.isProcessing = false;
        this.tempProduct = {
          imagesUrl: [],
        };
        this.productModal.show();
      } else if (type === 'edit') {
        this.tempProduct = { ...item };
        this.isProcessing = false;
        this.isNew = false;
        this.productModal.show();
      } else if (type === 'del') {
        this.tempProduct = { ...item };
        this.isProcessing = false;
        this.delProductModal.show();
      }
    },
    updateProduct() {
      let httpMethod = 'post';
      let url = `${apiUrl}/api/${apiPath}/admin/product`;
      if (!this.isNew) {
        httpMethod = 'put';
        url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
      }
      axios[httpMethod](url, { data: this.tempProduct })
        .then((res) => {
          Toast.fire({
            title: `${res.data.message}`,
            icon: 'success',
          });
          this.isLoading = true;
          this.isProcessing = true;
          this.productModal.hide();
          this.getProducts();
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
    delProduct() {
      axios
        .delete(`${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          Toast.fire({
            title: `${res.data.message}`,
            icon: 'success',
          });
          this.isProcessing = true;
          this.delProductModal.hide();
          this.getProducts();
          this.isLoading = true;
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
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
});
// app.component...
app.mount('#app');
