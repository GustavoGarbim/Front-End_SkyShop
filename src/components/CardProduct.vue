<template>
  <main>
    <EditProductModal
      :visivel="isModalVisible"
      :productId="selectedProductId"
      @fechar="fecharEditProductModal"
    />
    <DetailsProductModal
      :visivel="isModalVisibleDetails"
      :productId="selectedProductIdDetails"
      @fechar="fecharDetailsProductModal"
    />
    <div
      class="w-90 h-90 ml-10 mt-10 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 border border-sky-300"
    >
      <div class="relative overflow-hidden flex justify-center">
        <img
          :src="product.imageUrl"
          alt="*"
          class="h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div
          class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <button
            class="hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
            @click="abrirDetailsProductModal(product)"
          >
            👁️
          </button>
          <button
            class="hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
            @click="abrirEditProductModal(product)"
          >
            🖊️
          </button>
          <button
            class="hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
            @click="deleteProduct(product)"
          >
            🗑️
          </button>
        </div>
      </div>

      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-2 truncate">
          {{ product.name }}
        </h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          <span class="font-bold">Description</span> - {{ product.description }}
        </p>

        <div class="flex justify-between w-78 items-center">
          <span class="text-2xl font-bold text-sky-600">{{
            (product.price || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }}</span>
          <button
            v-if="product.stock"
            @click="cartStore.addToCart(product)"
            class="hover:cursor-pointer w-36 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg gap-2 transition-all duration-200 transform hover:scale-105"
          >
            Add to Cart
          </button>
          <button
            v-else
            class="hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg gap-2 transition-all duration-200 transform hover:scale-105"
          >
            Out of Stock
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cartStore";
import api from "../services/api";
import EditProductModal from "./EditProductModal.vue";
import DetailsProductModal from "./DetailsProductModal.vue";

const cartStore = useCartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isModalVisible = ref(false);
const selectedProductId = ref(null);

const isModalVisibleDetails = ref(false);
const selectedProductIdDetails = ref(null);

const abrirDetailsProductModal = (product) => {
  console.log(`[CardProduct] Abrindo modal para o produto ID: ${product.id}`);
  selectedProductIdDetails.value = product.id;
  isModalVisibleDetails.value = true;
};

const fecharDetailsProductModal = () => {
  isModalVisibleDetails.value = false;
  selectedProductIdDetails.value = null;
};

const abrirEditProductModal = (product) => {
  console.log(`[CardProduct] Abrindo modal para o produto ID: ${product.id}`);
  selectedProductId.value = product.id;
  isModalVisible.value = true;
};

const fecharEditProductModal = () => {
  isModalVisible.value = false;
  selectedProductId.value = null;
};

const deleteProduct = async (product) => {
  if (!confirm(`Tem certeza que deseja deletar "${product.name}"?`)) return;
  try {
    await api.delete(`/api/products/${product.id}`);
    alert("Produto deletado com sucesso!");
    window.location.reload();
  } catch (error) {
    console.error("Erro ao deletar produto: ", error);
  }
};
</script>