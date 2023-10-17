import { createRouter, createWebHistory } from 'vue-router'
import Product from '../components/Product';
import AddProduct from '../components/AddProduct';

const routes = [
  {
    // path: '/',
    // name: 'home',
    // component: HomeView
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
    component: AddProduct
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
