<template>
    <div class="container">
        <div>
            <button @click="showModal = true">Open Modal</button>
            <modalComponent v-if="showModal" @close="showModal = false">
                
                <editProductComponent />
            </modalComponent>
            <addProductComponent @close="closeModal" />
        </div>  
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody v-for="product in productVue " :key="product.id">
                <tr class="table-secondary">
                    <th scope="row">{{ product.id }}</th>
                    <th scope="row">{{ product.name }}</th>
                    <th scope="row">{{ product.description }}</th>
                    <th scope="row">{{ product.quantity }}</th>
                    <th scope="row">{{ product.price }}</th>
                    <th scope="row">
                        
                        <router-link class="btn btn-warning btn-sm" 
                        :to="{name:'editProductComponent', params:{id:product.id}}"
                        >Edit</router-link>
                        
                        <button class="btn btn-danger btn-sm" 
                        @click.prevent="productVue_del(product.id)">Delete</button></th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import modalComponent from '../components/Modal.vue';
import addProductComponent from './AddProduct.vue';
import editProductComponent from './EditProduct.vue';

    export default{
        name: 'productComponent',
        data() {
            return {
                productVue:Array,
                showModal:false
            }
        },
        created(){
            this.getProduct();
        },
        methods:{
            async getProduct(){
                let url = 'http://127.0.0.1:8000/api/product';
                await axios.get(url).then(response =>{
                    this.productVue = response.data.products;
                    console.log(this.productVue);
                }).catch(error => {
                    console.log(error);
                });
            },
            closeModal() {
                this.showModal = false; // Set showModal to false
                this.getProduct(); // Call the getProduct function
            },
            async productVue_del(id){
                let url= `http://127.0.0.1:8000/api/delproduct/${id}`;
                await axios.delete(url).then(response =>{
                    if(response.data.code == 200 ){
                        this.getProduct();
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
        },
        mounted(){
            console.log('Product is mounted');
        },
        components:{
            modalComponent,
            addProductComponent,
            editProductComponent,
        },
    }

</script>

<style>

.btn-modal{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem; 
    padding-left: 1rem;
    padding-right: 1rem; 
    border-radius: 9999px; 
    outline-style: none; 
    width: 14rem; 
    font-weight: 700; 
    color: #ffffff; 
    background-color: #3a4250; 
}
.btn-modal:hover{
    background-color: #1D4ED8; 
}
.modal-container{
    display: flex; 
    overflow-y: auto; 
    overflow-x: hidden; 
    position: fixed; 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; 
    z-index: 50; 
    justify-content: center; 
    align-items: center; 
}
.modal-content{
    position: relative; 
    width: auto; 
}
.modal-content-parent{
    display: flex; 
    flex-direction: column; 
    border-radius: 0.25rem; 
    width: 100%; 
    background-color: #ffffff; 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); 
    align-items: center;
}
.btn.btn-warning{
    margin-right: 10px;
}

</style>