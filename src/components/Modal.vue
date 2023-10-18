<template>
  <div class="modal" id="modalcomponent">
    <div class="modal-content">
      <slot></slot>
      <button @click="$emit('close')" class="btn btn-danger" >Close Modal</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'modalComponent',

  
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
}
.btn.btn-danger{
  width: 40%;
  position: absolute;
  top: 91%; 
  left: 28%; 
  transform: translate(-50%, -50%);
}
</style>