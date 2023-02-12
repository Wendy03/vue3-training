<template>
  <div class=" mt-5">
    <h2>{{ product.title }}</h2>
    <div class="row">
      <div class="col-sm-5">
        <div style="
            min-height: 50vh;
            background-size: cover;
            background-position: center;
          "
             :style="{ backgroundImage: `url(${product.imageUrl})` }"></div>
        <template v-for="(img, index) in product.imagesUrl"
                  :key="index + 'img'">
          <div class="row"
               v-if="img">
            <div class="col-3">
              <img :src="img"
                   :alt="index + 'img'"
                   class="card-image mt-2 w-100" />
            </div>
          </div>
        </template>
      </div>
      <div class="col-sm-7">
        <span class="badge bg-primary rounded-pill mb-2">{{
          product.category
        }}</span>
        <p>商品描述：{{ product.description }}</p>
        <p>商品內容：{{ product.content }}</p>
        <div class="h5">{{ product.price }} 元</div>
        <div class="input-group mt-5">
          <select class="form-select"
                  name="qty"
                  v-model.number="qty">
            <option :value="num"
                    v-for="num in 5"
                    :key="num + 'num'">
              {{ num }} {{ product.unit }}
            </option>
          </select>
          <button type="button"
                  class="btn btn-primary">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '../../utils/Toast';
import statusStore from '../../stores/statusStore';

const { VITE_API, VITE_PATH } = import.meta.env;
const status = statusStore();

export default {
  data() {
    return {
      product: {},
      qty: 1,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      status.isLoading = true;
      this.$http
        .get(`${VITE_API}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          status.isLoading = false;
          const { product } = res.data;
          this.product = product;
        })
        .catch((err) => {
          const errMessage = err.data?.message;
          status.isLoading = false;
          Toast.fire({
            title: `${errMessage}`,
            icon: 'error',
          });
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
