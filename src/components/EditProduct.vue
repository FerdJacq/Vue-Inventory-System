<template>
    <div class="container">
     <div class="row">
         <div>
             <div class="alert alert-danger" v-if="errors.length">
                 <ul class="mb-0">
                     <li v-for="(errors, index) in errors" :key="index">
                         {{ errors }}
                     </li>
                 </ul>
             </div>
             <h3>Edit Product{{ products.id }}</h3>
             <form @submit.prevent="productVue_update" novalidate>
                 <fieldset>
                     <div class="form-group">
                         <label class="form-label mt-2">Name</label>
                         <input type="text" class="form-control"
                         v-model="products.name" placeholder="Enter Name">
                     </div>
                     <div class="form-group">
                         <label class="form-label mt-2">Description</label>
                         <input type="text" class="form-control"
                         v-model="products.description" placeholder="Description">
                     </div>
                     <div class="form-group">
                         <label class="form-label mt-2">Quantity</label>
                         <input type="number" class="form-control"
                         v-model="products.quantity" placeholder="Quantity">
                     </div>
                     <div class="form-group">
                         <label class="form-label mt-2">Price</label>
                         <input type="number" class="form-control"
                         v-model="products.price" placeholder="Price">
                     </div>
                     <div class="form-group">
                         <label class="form-label mt-2">Image</label>
                         <input type="file" class="form-control"
                         accept="image/*">
                     </div>
                     <button class="btn btn-primary"  name="submit" type="submit">Update</button>
                 </fieldset>
             </form>
         </div>
     </div>
    </div>
 </template>
 
<script>
import axios from 'axios';

    export default{
        name:'editProductComponent',
        data(){
            return{
                products:{},
                name:'',
                description:'',
                quantity:'',
                price:'',
                Image:'',
                errors:[],
            }
        },
        created(){
            this.getProductbyId();
        },
        methods:{
            async productVue_update(){
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
                    let url = `http://127.0.0.1:8000/api/updateproduct/${this.$route.params.id}`;
                    await axios.post(url, formData).then((response)=>{
                        console.log(response);
                        if(response.status == 200){
                            alert(response.data.message);
                        }else{
                            console.log('error');
                        }
                    }).catch(error => {
                        this.errors.push(error.response);
                    });
                }
            },
            async getProductbyId(){
                let url = `http://127.0.0.1:8000/api/editproduct/${this.$route.params.id}/edit`;
                await axios.get(url).then(response=>{
                    console.log(response);
                    this.products = response.data;
                });
            }
        },
        mounted: function(){
            console.log('Edit Component is Loaded!!');
        }
    }
</script>
<style>
.btn.btn-primary{
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>