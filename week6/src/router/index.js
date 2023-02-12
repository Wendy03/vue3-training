import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/LayoutView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/frontend/HomeView.vue'),
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('../views/frontend/ProductsView.vue'),
        },
        {
          path: '/product/:id',
          name: 'product',
          component: () => import('../views/frontend/ProductView.vue'),
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('../views/frontend/CartView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginAmin.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/backend/AdminProduct.vue'),
        },
      ],
    },
  ],
});

export default router;
