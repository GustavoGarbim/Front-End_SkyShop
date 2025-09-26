<template>
  <main>
    <div v-if="visivel" class="modal-backdrop">
      <form @submit.prevent="createProduct">
        <div class="modal-content">
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
            v-model="productForm.image"
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

    alert('Produto criado com sucesso!');

  } catch (error) {
    console.error("Erro ao adicionar produto: ", error);
    alert("Falha ao adicionar produto, tente novamente mais tarde.");
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
}
</style>