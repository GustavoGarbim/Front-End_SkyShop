<template>
  <main>
    <div class="ml-10 mt-10">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Featured Products</h1>
      <h2 class="font-medium text-lg text-gray-600">
        Discover our premium collection of products
      </h2>
    </div>
    <CardProduct/>
  </main>
</template>

<script>
import CardProduct from '../components/CardProduct.vue'

export default {
  components: { CardProduct },
  name: "Section",
};
</script>