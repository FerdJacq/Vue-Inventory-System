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
             <h3>Edit Product</h3>
             <form @submit.prevent="productVue_update" novalidate>
                 <fieldset>
                     <div class="form-group">
                         <label class="form-label mt-2">Name</label>
                         <input type="text" class="form-control"
                         v-model="name" placeholder="Enter Name" >
                     </div>
                     <div class="form-group">
                         <label class="form-label mt-2">Description</label>
                         <input type="text" class="form-control"
                         v-model="description" placeholder="Description">
                     </div>
                     <div class="form-group">
                         <label class="form-label mt-2">Quantity</label>
                         <input type="number" class="form-control"
                         v-model="quantity" placeholder="Quantity" readonly>
                     </div>
                     <div class="form-group">
                         <label class="form-label mt-2">Price</label>
                         <input type="number" class="form-control"
                         v-model="price" placeholder="Price">
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
import axios from '../axios-connection';

    export default{
        name:'editProductComponent',
        data(){
            return{
                errors:[],
                name: '',
                description: '',
                quantity: '',
                price: '',
            }
        },
        created(){
            
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
                    formData.append('name',this.name);
                    formData.append('description',this.description);
                    formData.append('quantity',this.quantity);
                    formData.append('price',this.price);
                    await axios.post(`/updateproduct/${this.product.id}`, formData).then((response)=>{
                        console.log(response);
                        if(response.status == 200){
                            this.$emit('close');
                        }else{
                            console.log('error');
                        }
                    }).catch(error => {
                        this.errors.push(error.response);
                    });
                }
            },
            async getProductbyId(){
                await axios.get(`/editproduct/${this.product.id}/edit`).then(response=>{
                    console.log(response);
                    this.products = response.data;
                    this.name = this.products.name;
                    this.description = this.products.description;
                    this.quantity = this.products.quantity;
                    this.price = this.products.price;
                });
            }
        },
        mounted: function(){
            console.log('Edit Component is Loaded!!');
            this.getProductbyId();
        },
        props:['product'],
    }
</script>
<style>
.btn.btn-primary{
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>