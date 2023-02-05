export default {
  template: '#userProductModal',
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    status: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      productModal: {},
      qty: 1,
    };
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.modal);
  },
  methods: {
    showModal() {
      this.productModal.show();
    },
    hideModal() {
      this.productModal.hide();
    },
  },
};
