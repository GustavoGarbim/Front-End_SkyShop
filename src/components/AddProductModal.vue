<template>
  <main>
    <div
      v-if="visivel"
      class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50"
    >
      <form @submit.prevent="createProduct">
        <div
          class="bg-white p-5 rounded-2xl shadow-2xl w-130 h-170 flex flex-col"
        >
          <div
            class="flex justify-between items-center p-6 border-b border-gray-200"
          >
            <h1 class="text-2xl font-bold text-gray-800">Add New Product</h1>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:cursor-pointer"
              @click="$emit('fechar')"
            >
              X
            </button>
          </div>
          <br />
          <label for="image">Product Image URL</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
            placeholder="https://example.com/image.jpg"
            v-model="productForm.imageUrl"
            required
          />
          <br />

          <label for="name">Product Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter product name"
            v-model="productForm.name"
            required
          />
          <br />

          <label for="price">Price ($)</label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
            step="0.01"
            min="0"
            placeholder="Enter product price"
            v-model="productForm.price"
            required
          />
          <br />

          <label for="description">Description</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Enter product description"
            v-model="productForm.description"
            required
          />
          <br />

          <label for="stock">Stock</label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Enter product stock"
            v-model="productForm.stock"
            required
          />
          <br />

          <!-- buttons for cancel and save -->
          <div class="flex flex-row gap-2">
            <button
              @click="$emit('fechar')"
              class="hover:cursor-pointer rounded-lg w-60 h-10 bg-gray-400 hover:bg-gray-500 transition-colors duration-200 font-medium"
            >
              Close
            </button>
            <br />
            <!-- make this button save the product  METHOD: UPDATE -->
            <button
              type="submit"
              class="hover:cursor-pointer rounded-lg w-60 h-10 bg-sky-400 text-white hover:bg-sky-500 transition-colors duration-200 font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { watch, reactive } from "vue";
import api from "../services/api";

const props = defineProps({
  visivel: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["fechar"]);

watch(
  () => props.visivel,
  (novoValor) => {
    console.log("A prop 'visivel' mudou para:", novoValor);
    if (novoValor) {
      productForm.image = "";
      productForm.name = "";
      productForm.price = null;
      productForm.description = "";
      productForm.stockQuantity = 0;
    }
  }
);

const productForm = reactive({
  imageUrl: "",
  name: "",
  price: null,
  description: "",
  stock: 0,
});

const createProduct = async () => {
  if (!productForm.name || !productForm.price || productForm.price <= 0) {
    alert("Por favor, preencha o nome e um preço válido maior que zero.");
    return;
  }

  try {
    const response = await api.post(`/api/products`, productForm);
    window.location.reload();
    alert("Produto criado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar produto: ", error);
    alert("Falha ao adicionar produto, tente novamente mais tarde.");
  }
};
</script>