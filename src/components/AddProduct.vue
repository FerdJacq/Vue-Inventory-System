<template>
   <div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="alert alert-danger" v-if="errors.length">
                <ul class="mb-0">
                    <li v-for="(errors, index) in errors" :key="index">
                        {{ errors }}
                    </li>
                </ul>
            </div>
            <form @submit.prevent="productVue_add" novalidate>
                <fieldset>
                    <div class="form-group">
                        <label class="form-label mt-4">Name</label>
                        <input type="text" class="form-control"
                        v-model="products.name" placeholder="Enter Name">
                    </div>
                    <div class="form-group">
                        <label class="form-label mt-4">Description</label>
                        <input type="text" class="form-control"
                        v-model="products.description" placeholder="Description">
                    </div>
                    <div class="form-group">
                        <label class="form-label mt-4">Quantity</label>
                        <input type="number" class="form-control"
                        v-model="products.quantity" placeholder="Quantity">
                    </div>
                    <div class="form-group">
                        <label class="form-label mt-4">Price</label>
                        <input type="number" class="form-control"
                        v-model="products.price" placeholder="Price">
                    </div>
                    <div class="form-group">
                        <label class="form-label mt-4">Image</label>
                        <input type="file" class="form-control"
                        accept="image/*">
                    </div>

                    <button class="btn btn-primary mt-4" name="submit" type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
    </div>
   </div>
</template>

<script>
import axios from 'axios';
    export default{
        name: 'AddProductComponent',
        data(){
            return{
                products:{},
                name:'',
                description:'',
                quantity:'',
                price:'',
                Image:'',
                errors:[]
            }
        },
        methods:{
            async productVue_add(){
                this.errors=[];
                if(!this.products.name){
                    this.errors.push('Name is required')
                }
                if(!this.products.description){
                    this.errors.push('Description is required')
                }
                if(!this.products.quantity){
                    this.errors.push('Quantity is required')
                }
                if(!this.products.price){
                    this.errors.push('Price is required')
                }

                if(!this.errors.length){
                    let formData = new FormData();
                    formData.append('name',this.products.name);
                    formData.append('description',this.products.description);
                    formData.append('quantity',this.products.quantity);
                    formData.append('price',this.products.price);
                    let url = 'http://127.0.0.1:8000/api/addproduct';
                    await axios.post(url, formData).then((response)=>{
                        console.log(response);
                        if(response.status==200){
                            alert(response.data.message)
                        }
                    });
                }
            }
        }
    }
    
</script>