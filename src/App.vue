<template>
  <headerComponent title="Inventory System"/>
  <router-view/>
</template>

<script>
import headerComponent from './components/Header.vue'

export default {
  name: 'App',
  components:{
     headerComponent
  }
}

</script>