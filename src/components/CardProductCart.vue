<template>
  <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3">
    <div class="flex items-center gap-4">
      <img :src="item.imageUrl || '/placeholder.png'" :alt="item.productName" class="w-16 h-16 object-cover rounded-md">
      <div>
        <h3 class="font-semibold text-gray-800">{{ item.productName }}</h3>
        <p class="text-sky-600 font-bold">$ {{ item.productPrice }}</p>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3 border border-gray-200 rounded-lg p-1">
        <button @click="cartStore.decrementQuantity(item.productId)" class="w-8 h-8 flex items-center justify-center text-sky-500 rounded-md hover:bg-sky-100 transition-colors">
          -
        </button>
        <span class="font-bold w-4 text-center">{{ item.quantity }}</span>
        <button @click="cartStore.incrementQuantity(item.productId)" class="w-8 h-8 flex items-center justify-center text-sky-500 rounded-md hover:bg-sky-100 transition-colors">
          +
        </button>
      </div>
      <button @click="cartStore.removeFromCart(item.productId)" class="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';

defineProps({
  item: {
    type: Object,
    required: true,
  }
});

const cartStore = useCartStore();
</script>