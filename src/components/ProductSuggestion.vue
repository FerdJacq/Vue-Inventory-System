<template>
    <div>
      <input class="search form-control me-sm-2 mt-4 mb-4" type="search" v-model="searchTerm" @input="handleInput" placeholder="Search...">
      <ul v-if="searchResults.length">
        <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
    
import axios from '../axios-connection';

    export default {
        data() {
        return {
            searchTerm: '',
            searchResults: []
        };},
        methods: {
        handleInput() {
            if (this.searchTerm.length >= 3) {
            // Make a request to your backend API to fetch search results
            // Example using axios:
            axios.get(`/api/search?term=${this.searchTerm}`)
                .then(response => {
                this.searchResults = response.data;
                })
                .catch(error => {
                console.error(error);
                });
            } else {
            this.searchResults = [];
            }
        }
        }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  