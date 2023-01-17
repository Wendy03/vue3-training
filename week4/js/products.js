import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { Toast } from '../../js/helper.js';
import { apiUrl, apiPath } from '../../js/config.js';

import productModalContent from '../components/productModal.js';
import delProductModalContent from '../components/delProductModal.js';
import pagination from '../components/pagination.js';

let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      products: [],
      pagination: {},
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      isLoading: true,
      isProcessing: true,
    };
  },
  components: { productModalContent, delProductModalContent, pagination },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(
      document.getElementById('delProductModal')
    );
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
    getProducts(page = 1) {
      axios
        .get(`${apiUrl}/api/${apiPath}/admin/products?page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data;
          this.isLoading = false;
          this.isProcessing = false;
          this.products = products;
          this.pagination = pagination;
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
        productModal.show();
      } else if (type === 'edit') {
        this.tempProduct = { ...item };
        this.isProcessing = false;
        this.isNew = false;
        productModal.show();
      } else if (type === 'del') {
        this.tempProduct = { ...item };
        this.isProcessing = false;
        delProductModal.show();
      }
    },
    closeModal(type) {
      if (type === 'updateData') {
        productModal.hide();
      } else if (type === 'delData') {
        delProductModal.hide();
      }
    },
  },
});
// app.component...
app.mount('#app');
