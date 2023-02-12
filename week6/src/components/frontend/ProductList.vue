<template>
  <div class="col-md-10 my-5">
    <div class="row">
      <div class="col-md-4 col-sm-6 mb-3 mb-4"
           v-for="product in filterProducts"
           :key="product.id">
        <div class="card border-0 shadow-sm h-100">
          <div style="height: 170px;
                  background-size: cover;
                  background-position: center;
                "
               :style="{ backgroundImage: `url(${product.imageUrl})` }"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
                  product.category
                }}</span>
            <h5 class="card-title">
              <a href="#"
                 class="text-dark">{{ product.title }}</a>
            </h5>
            <p class="card-text">{{ product.content }}</p>
            <div class="text-right pr-2">{{ product.price }} 元</div>
          </div>
          <div class="card-footer d-flex">
            <RouterLink :to="`/product/${product.id}`"
                        class="btn btn-outline-secondary btn-sm">
              <div class="spinner-border m-5"
                   role="status"
                   v-if="loadingItem === product.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              查看更多
              <!-- <i class="fas fa-spinner fa-spin"  v-if="loadingItem === product.id"></i>
                  查看更多 -->
            </RouterLink>
            <button type="button"
                    class="btn btn-outline-danger btn-sm ms-auto">
              <i class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import productsStore from '../../stores/frontend/productsStore';
import statusStore from '../../stores/statusStore';

export default {
  data() {
    return {};
  },
  components: { RouterLink },
  methods: {
    ...mapActions(productsStore, ['getProducts']),
  },
  computed: {
    ...mapState(productsStore, ['products', 'filterProducts']),
    ...mapState(statusStore, ['isLoading', 'loadingItem']),
  },
  mounted() {
    this.getProducts();
  },
};
</script>
