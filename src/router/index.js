import { createRouter, createWebHistory } from 'vue-router'
import Product from '../components/Product';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';

const routes = [
  {
    // path: '/',
    // name: 'home',
    // component: HomeView
  },
  {
    path: '/product',
    name: 'productComponent',
    component: Product
  },
  {
    path: '/addproduct',
    name: 'addProductComponent',
    component: AddProduct
  },
  {
    path: '/product/:id?/edit',
    name: 'editProductComponent',
    component: EditProduct
  }
  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
