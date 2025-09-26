<template>
  <main>
    <div v-if="visivel" class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50">
      <form @submit.prevent="saveChanges">
        <div class="bg-white p-5 rounded-2xl shadow-2xl w-130 h-auto flex flex-col">
          <div
            class="flex justify-between items-center p-6 border-b border-gray-200"
          >
            <h1 class="text-2xl font-bold text-gray-800">
              Editing product
            </h1>
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
            v-model="product.imageUrl"
            required
          />

          <br />

          <label for="name">Product Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter product name"
            v-model="product.name"
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
            v-model="product.price"
            required
          />
          <br />

          <label for="description">Description</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Enter product description"
            v-model="product.description"
            required
          />
          <br />

          <label for="stock">Stock</label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Enter product stock"
            v-model="product.stock"
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
import { ref, watch } from "vue";
import api from "../services/api";

const props = defineProps({
  visivel: { type: Boolean, required: true },
  productId: { type: Number, default: null },
});

const emit = defineEmits(["fechar", "salvo"]);

const product = ref(null);

const pullData = async (id) => {
  if (!id) return;
  try {
    const response = await api.get(`/api/products/${id}`);
    product.value = response.data;
  } catch (error) {
    console.error(`Erro ao puxar dados do produto ${id}:`, error);
  }
};

watch(
  () => props.productId,
  (newId) => {
    if (newId) {
      pullData(newId);
    } else {
      product.value = null;
    }
  }
);

const saveChanges = async () => {
  if (!product.value) return;
  try {
    console.log("Enviando estes dados para a API (payload):", product.value);
    await api.put(`/api/products/${product.value.id}`, product.value);
    alert("Produto atualizado com sucesso!");
    emit("salvo");
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
    if (error.response) {
      console.error("Detalhes do erro do servidor:", error.response.data);
    }
  }
};
</script>