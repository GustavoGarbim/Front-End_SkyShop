<template>
  <main class="h-screen w-auto bg-gradient-to-b from-sky-100 to-sky-300">
    <Header />
    <SearchBar />
    <div class="ml-10 mt-10">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Featured Products</h1>
      <h2 class="font-medium text-lg text-gray-600">
        Discover our premium collection of products
      </h2>
    </div>
    <div class="px-10 mt-6">
      <input
      type="text"
      v-model="searchTerm"
      placeholder="Search products..."
      class="ml-140 w-180 p-3 border border-gray-300 rounded-lg"
    />
    </div>
    <div class="grid grid-cols-4 gap-8  p-10">
      <CardProduct
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @produtoAtualizado="pullDataProduct"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../services/api";
import Header from "../components/Header.vue";
import CardProduct from "../components/CardProduct.vue";

const products = ref([]);
const searchTerm = ref("");

const filteredProducts = computed(() => {
  if (!searchTerm.value) {
    return products.value;
  }

  return products.value.filter(
    (
      product // Converte o nome do produto e o termo de busca para minúsculas para uma busca case-insensitive
    ) => product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

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