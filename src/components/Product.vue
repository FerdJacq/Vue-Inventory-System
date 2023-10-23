<template>
    <div class="container">
        <div>
            <div class="d-flex">
               <!-- <input v-model="searchQuery" @input="updateSuggestions" @blur="clearSuggestions" class="search form-control me-sm-2 mt-4 mb-4" type="search" placeholder="Search" /> -->
                    <product-suggestion :suggestions="suggestions" :select-suggestion="selectSuggestion"/>
                <button @click="showModalComponent" id="addbtn" class="btn btn-primary mt-4 mb-4">Add Product</button>
            </div>
             <modalComponent v-if="showModal " @close="showModal = false" >
                <addProductComponent  @close="closeModal" v-show="showAddProductComponent" />
                <editProductComponent v-if="selectedProduct" :product="selectedProduct" v-show="showEditProductComponent" @close="closeModal"/>
                <addStockComponent v-if="selectedProduct" :product="selectedProduct" v-show="showAddStockComponent"/>
            </modalComponent>
            
            
        </div>  
        <table class="table table-hover">
            <thead>
                
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
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
                        <span v-if="product.quantity > 0">STOCK</span> 
                        <span v-else>No Stock</span>
                    </th>
                    <th scope="row">
                        <div class="col">
                            <button class="btn btn-primary btn-sm"
                            @click.prevent="addStock(product)" id="addStockbtn">Add Stock</button>

                            <button class="btn btn-warning btn-sm" 
                            @click.prevent="updateModal(product)" id="editbtn">Edit</button>
                        </div>
                        <div class="col">
                            <button class="btn btn-danger btn-sm" 
                            @click.prevent="productVue_del(product.id)" >Delete</button>
                        </div></th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import modalComponent from '../components/Modal.vue';
import addProductComponent from './AddProduct.vue';
import editProductComponent from './EditProduct.vue';
import productSuggestion from './ProductSuggestion.vue';
import addStockComponent from './AddStock.vue';
import axios from '../axios-connection';


    export default{
        name: 'productComponent',
        data() {
            return {
                productVue:Array,
                showModal:false,
                product:Array,
                selectedProduct:null,
                showAddProductComponent: false,
                showEditProductComponent: false,
                addProductComponent:false,
                searchQuery: '',
                suggestions: []
            }
        },
        created(){
            this.getProduct();
        },
        methods:{
            async getProduct(){
                await axios.get('/product').then(response =>{
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
            showModalComponent(){
                this.showModal = true;
                this.showAddProductComponent = true;
                this.showEditProductComponent = false;
                this.showAddStockComponent = false;
            },
            updateModal(product){
                this.selectedProduct = product;
                this.showAddProductComponent = false;
                this.showEditProductComponent = true;
                this.showAddStockComponent = false;
                this.showModal = true;
            },
            addStock(product){
                this.selectedProduct = product;
                this.showModal = true;
                this.showAddStockComponent = true;
                this.showAddProductComponent = false;
                this.showEditProductComponent = false;
            },
            async productVue_del(id){
                await axios.delete(`/delproduct/${id}`).then(response =>{
                    if(response.data.code == 200 ){
                        this.getProduct();
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            //search Suggestion
            updateSuggestions() {
                if (this.filteredProducts) {
                    this.suggestions = this.filteredProducts.slice(0, 5); // Limit suggestions to 5
                }
            },
            clearSuggestions() {
                this.suggestions = [];
            },
            selectSuggestion(suggestion) {
                this.searchQuery = suggestion.name;
                this.clearSuggestions();
            },
            fetchProducts() {
                axios.get('/product').then(response => {
                        console.log('API Response:', response.data); // Add this line for debugging
                        this.product = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error);
                    });
            },
        },
        mounted(){
            console.log('Product is mounted');
            this.fetchProducts();
        },
        components:{
            modalComponent,
            addProductComponent,
            editProductComponent,
            productSuggestion,
            addStockComponent,
        },
        computed: {
            filteredProducts() {
                return this.product.filter(product => 
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
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
    width: 27%;
    margin-bottom: 10px;
}
#addbtn.btn.btn-primary{
    float: none;
    
}
.form-control.search{
    width: 89%;
}

</style>