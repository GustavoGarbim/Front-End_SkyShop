<template>
  <div
    className="w-90 ml-10 mt-10 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
  >
    <div className="relative overflow-hidden">
      <img
        src="../../public/circle.png"
        alt="*"
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div
        className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <button
          className="hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
        >
          🖊️
        </button>
        <button
          className="hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
        >
          🗑️
        </button>
      </div>
    </div>

    <div className="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2 truncate">
        {{ product.name }}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ product.description }}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-sky-600"
          >R$ {{ (product.price || 0).toFixed(2) }}</span
        >
        <button
          @click="cartStore.addToCart(product)"
          className="hover:cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();

defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>