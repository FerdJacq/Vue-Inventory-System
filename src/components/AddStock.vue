<template>
    <div class="container">
     <div class="row">
         <div>
        
            <!-- Add Stock (Product Name) -->
            <h3>Add Stock</h3>{{ product.name }} 
            <form @submit.prevent="productVue_addStock" novalidate>
                <fieldset>
                    <div class="form-group">
                         <label class="form-label mt-2">Quantity</label>
                         <input type="Number" class="form-control"
                         v-model="addStocks" placeholder="Add Stocks" min="1" >
                    </div>
                    <button class="btn btn-primary"  name="submit" type="submit">Add Stock</button>
                </fieldset>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from '../axios-connection';

export default{
    name:'addStockComponent',
    data() {
        return {
            addStocks:'',
        }
    },
    methods:{
        async productVue_addStock(){
                this.errors=[];
                if(!this.products.addStocks){
                    this.errors.push('Quantity is required')
                }
                if(!this.errors.length){
                    let formData = new FormData();
                    formData.append('addStocks',this.products.addStocks);
                    await axios.post(`/addstock/${this.product.id}`, formData).then((response)=>{
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
                });
            }
    },
    props:['product'],
    mounted: function(){
            console.log('AddStock Component is Loaded!!');
            this.getProductbyId();
        },
}
</script>