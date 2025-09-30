<script setup>
import { onMounted } from 'vue';
import { useCartStore } from './stores/cartStore';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchCart();
});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>