<template>
  <main
    class="h-20 flex justify-start space-x-276 bg-white shadow-red-400 border-b-2 border-sky-200"
  >
    <div class="ml-5 flex items-center">
      <h1 class="text-3xl font-bold text-sky-600">SkyShop</h1>
      <p class="w-40 ml-4 text-sm text-gray-500">Premium E-commerce</p>
    </div>
    <div class="flex content-center space-x-5">
      <button
        @click="abrirModal"
        class="hover:cursor-pointer mt-4 w-35 h-10 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
      >
        Add Product
      </button>
      <ProductModal :visivel="modalAberto" @fechar="fecharModal" />
      <button
      @click="abrirModal"
        class="hover:cursor-pointer mt-4 w-35 h-10 bg-sky-200 hover:bg-sky-300 text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
      >
        Cart
      </button>
      <!-- switch the function to the most properly for the button -->
      <button
      @click="abrirModal"
        class="hover:cursor-pointer mt-4 w-35 h-10 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
      >
        Payment
      </button>
    </div>
  </main>
</template>

<script>
import ProductModal from "./ProductModal.vue";

export default {
  components: { ProductModal },
  name: "Header",
  data() {
    return {
      modalAberto: false,
    };
  },
  methods: {
    abrirModal() {
      console.log('1. Botão de abrir foi clicado!');
      this.modalAberto = true;
      console.log('2. Estado "modalAberto" agora é:', this.modalAberto);
    },

    fecharModal() {
      this.modalAberto = false;
    },
  },
};
</script>