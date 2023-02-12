import axios from 'axios';
import { defineStore } from 'pinia';
import Toast from '../../utils/Toast';
import statusStore from '../statusStore';

const status = statusStore();

const { VITE_API, VITE_PATH } = import.meta.env;

export default defineStore('adminProducts', {
  state: () => ({
    products: [],
    pagination: {},
  }),
  actions: {
    getProducts(page = 1) {
      status.isLoading = true;
      axios
        .get(`${VITE_API}/api/${VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data;
          status.isLoading = false;
          status.isProcessing = false;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          const errMessage = err.data?.message || '資料錯誤，稍後在試';
          this.isLoading = false;
          Toast.fire({
            title: `${errMessage}`,
            icon: 'error',
          });
        });
    },
  },
});
