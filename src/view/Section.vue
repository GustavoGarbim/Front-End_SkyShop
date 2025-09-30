<template>
  <main class="h-screen w-auto bg-gradient-to-b from-sky-100 to-sky-300">
    <Header />
    <div class="ml-10 mt-10">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Featured Products</h1>
      <h2 class="font-medium text-lg text-gray-600">
        Discover our premium collection of products
      </h2>
    </div>
    <div class="grid grid-cols-4 gap-8 mt-10">
      <CardProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import Header from "../components/Header.vue";
import CardProduct from "../components/CardProduct.vue";

const products = ref([]);

const pullDataProduct = async () => {
  try {
    const response = await api.get(`/api/products/`);
    products.value = response.data;
  } catch (error) {
    console.error("Erro ao puxar dados do servidor: ", error);
  }
};

onMounted(() => {
  pullDataProduct();
});
</script>