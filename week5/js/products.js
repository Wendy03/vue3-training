import { Toast } from '../../js/helper.js';
import { apiUrl, apiPath } from '../../js/config.js';

import pagination from '../components/pagination.js';
import userProductModal from '../components/userProductModal.js';
import userOrderModal from '../components/userOrderModal.js';
const { localize, loadLocaleFromURL } = VeeValidateI18n;

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json'
);

VeeValidate.configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      products: [],
      categories: ['全部商品', '淺焙咖啡', '中焙咖啡', '深焙咖啡', '周邊商品'],
      filterCategory: '全部商品',
      product: {},
      carts: [],
      cartsTotal: 0,
      subTotal: 0,
      pagination: {},
      cartModal: false,
      status: {
        loadingItem: '',
        isProcessing: false,
      },
      isLoading: false,
    };
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
  components: {
    pagination,
    userProductModal,
    userOrderModal,
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      axios
        .get(`${apiUrl}/api/${apiPath}/products?page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data;
          this.isLoading = false;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          const errMessage = err.data?.message;
          this.isLoading = false;
          Toast.fire({
            title: `${errMessage}`,
            icon: 'error',
          });
        });
    },
    getProduct(id) {
      console.log(id);
      this.status.loadingItem = id;
      axios
        .get(`${apiUrl}/api/${apiPath}/product/${id}`)
        .then((res) => {
          this.status.loadingItem = '';
          this.product = res.data.product;
          this.$refs.userProductModal.showModal();
        })
        .catch((_err) => {
          this.isLoading = false;
          Toast.fire({
            title: '此商品不存在',
            icon: 'error',
          });
        });
    },
    getCarts() {
      this.isLoading = true;
      axios
        .get(`${apiUrl}/api/${apiPath}/cart`)
        .then((res) => {
          const { carts, total, final_total } = res.data.data;
          this.isLoading = false;
          this.carts = carts;
          this.cartsTotal = total;
          this.subTotal = final_total;
        })
        .catch((_err) => {
          this.isLoading = false;
          Toast.fire({
            title: '無法取得資料，稍後再試',
            icon: 'error',
          });
        });
    },
    addToCart(id, qty = 1) {
      this.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$refs.userProductModal.hideModal();
      axios
        .post(`${apiUrl}/api/${apiPath}/cart`, { data: cart })
        .then((res) => {
          const { message } = res.data;
          this.status.loadingItem = '';
          Toast.fire({
            title: `${message}`,
            icon: 'success',
          });
          this.getCarts();
        })
        .catch((_err) => {
          this.status.loadingItem = '';
          Toast.fire({
            title: '無法取得資料，稍後再試',
            icon: 'error',
          });
        });
    },
    updateCart(id, qty, item) {
      const cart = {
        product_id: item.product_id,
        qty,
      };
      this.status.loadingItem = id;
      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${id}`, { data: cart })
        .then((res) => {
          const { message } = res.data;
          this.status.loadingItem = '';
          Toast.fire({
            title: `${message}`,
            icon: 'success',
          });
          this.getCarts();
        })
        .catch((_err) => {
          this.status.loadingItem = '';
          Toast.fire({
            title: '無法取得資料，稍後再試',
            icon: 'error',
          });
        });
    },
    removeCartItem(id) {
      this.status.loadingItem = id;
      axios
        .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
        .then((res) => {
          const { message } = res.data;
          this.status.loadingItem = '';
          Toast.fire({
            title: `${message}`,
            icon: 'success',
          });
          this.getCarts();
        })
        .catch((_err) => {
          this.status.loadingItem = '';
          Toast.fire({
            title: '無法刪除資料，稍後再試',
            icon: 'error',
          });
        });
    },
    deleteAllCarts() {
      axios
        .delete(`${apiUrl}/api/${apiPath}/carts`)
        .then((res) => {
          const { message } = res.data;
          Toast.fire({
            title: `${message}`,
            icon: 'success',
          });
          this.getCarts();
        })
        .catch((_err) => {
          Toast.fire({
            title: '無法刪除資料，稍後再試',
            icon: 'error',
          });
        });
    },
    userForm() {
      this.$refs.userOrderModal.showModal();
      this.cartModal = !this.cartModal;
    },
    toggleCarts() {
      this.cartModal = !this.cartModal;
    },
  },
  computed: {
    filterProducts() {
      const currentCategory = this.products.filter((product) =>
        this.filterCategory === '全部商品'
          ? this.products
          : product.category === this.filterCategory
      );
      return currentCategory;
    },
  },
});

app.component('loading', VueLoading.Component);
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app');
