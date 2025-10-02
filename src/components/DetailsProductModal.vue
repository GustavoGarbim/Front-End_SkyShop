<template>
  <main>
    <div
      v-if="visivel"
      class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white p-5 rounded-2xl shadow-2xl w-230 h-180 flex flex-col"
      >
        <div
          class="flex justify-between items-center p-6 border-b border-gray-200"
        >
          <h1 class="text-2xl font-bold text-gray-800">Product Details</h1>
          <button
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:cursor-pointer"
            @click="$emit('fechar')"
          >
            X
          </button>
        </div>
        <br />
        <section class="flex">
          <div
            class="mr-10 bg-gray-50 border-2 border-gray-300 rounded flex items-center"
          >
            <img :src="product.imageUrl" :alt="product.name" />
          </div>
          <div class="w-185 h-80">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">
                {{ product.name }}
              </h1>
            </div>
            <span class="text-sm text-gray-600">⭐ (4.2) • 127 reviews</span>
            <div>
              <br />
              <div class="text-4xl font-bold text-sky-600 mb-6">
                {{
                  (product.price || 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}
              </div>
              <p class="text-gray-600 leading-relaxed w-120">
                <span class="font-bold">Description</span> -
                {{ product.description }}
              </p>
              <br />
            </div>
            <div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                  🛡️
                  <span class="text-sm text-gray-700">2 Year Warranty</span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                  🚚
                  <span class="text-sm text-gray-700">Free Shipping</span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                  ↪️
                  <span class="text-sm text-gray-700">30-Day Returns</span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                  🌟
                  <span class="text-sm text-gray-700">Premium Quality</span>
                </div>
              </div>
            </div>
            <br />
            <div class="border-t border-gray-200 pt-6">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">SKU:</span>
                  <span class="ml-2 font-medium">#{{ product.id }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Stock:</span>
                  <span
                    v-if="product.stock"
                    class="ml-2 font-medium text-green-600"
                    >{{ product.stock }} In Stock</span
                  >
                  <span v-else class="ml-2 font-medium text-red-600"
                    >Out of Stock</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "../services/api";

const props = defineProps(
  {
    visivel: { type: Boolean, required: true },
    productId: { type: Number, default: null },
    product: { type: Object, required: true },
  },
  watch(
    () => props.visivel,
    (novoValor) => {
      console.log(
        '3. Prop "visivel" recebida no filho com o valor:',
        novoValor
      );
    }
  )
);

defineEmits(["fechar"]);

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
</script>