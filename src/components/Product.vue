<template>
    <div class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody v-for="product in productVue " :key="product.id">
                <tr class="table-secondary">
                    <th scope="row">{{ product.id }}</th>
                    <th scope="row">{{ product.name }}</th>
                    <th scope="row">{{ product.description }}</th>
                    <th scope="row">{{ product.quantity }}</th>
                    <th scope="row">{{ product.price }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

    export default{
        name: 'productComponent',
        data() {
            return {
                productVue:Array
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
            }
        },
        mounted(){
            console.log('Product is mounted');
        }
    }

</script>