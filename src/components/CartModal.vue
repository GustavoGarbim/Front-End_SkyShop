<template>
  <main>
    <div
      v-if="visivel"
      class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50"
    >
      <form @submit.prevent="finalCheckout">
        <div
          class="bg-white p-5 rounded-2xl shadow-2xl w-130 h-auto flex flex-col"
        >
          <div
            class="flex justify-between items-center p-6 border-b border-gray-200"
          >
            <h1 class="text-2xl font-bold text-gray-800">Shopping Cart</h1>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:cursor-pointer"
              @click="$emit('fechar')"
            >
              X
            </button>
          </div>
          <br />
          <br />

          <div
            v-if="cartStore.cartItemCount === 0"
            class="text-center text-gray-500"
          >
            <p>Seu carrinho está vazio.</p>
          </div>

          <div v-else class="overflow-y-auto">
            <div class="flex flex-col gap-3">
              <CardProductCart
                v-for="item in cartStore.cartItems"
                :key="item.id"
                :item="item"
              />
            </div>
          </div>

          <div
            class="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center"
          >
            <span class="text-lg font-medium text-gray-800">Total:</span>
            <span class="text-2xl font-bold text-sky-600">
              $ {{ cartStore.cartTotalPrice.toFixed(2) }}
            </span>
          </div>

          <!-- buttons for cancel and payment -->
          <div class="flex flex-row gap-2 mt-2">
            <button
              @click="$emit('fechar')"
              class="hover:cursor-pointer rounded-lg w-60 h-10 bg-gray-300 hover:bg-gray-500 transition-colors duration-200 font-medium"
            >
              Close
            </button>
            <br />
            <button
              type="submit"
              class="hover:cursor-pointer rounded-lg w-60 h-10 bg-green-400 text-white hover:bg-green-500 transition-colors duration-200 font-medium"
            >
              Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { watch } from "vue";
import api from "../services/api";
import CardProductCart from "./CardProductCart.vue";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();

const props = defineProps({
  visivel: {
    type: Boolean,
    required: true,
  },
});

watch(
  () => props.visivel,
  (novoValor) => {
    console.log(`Prop "visivel" recebida com o valor: ${novoValor}`);
  }
);

defineEmits(["fechar"]);

const finalCheckout = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Erro: Usuário não está logado. Faça login para continuar.");
    return;
  }
  try {
    const response = await api.get('/api/carts', { params: { userId } });
    const cartId = response.id

    console.log(cartId)
    await api.post(
      "/api/checkouts",
      { cartId: cartId },
      { params: { userId } }
    );

    alert("Compra realizada com sucesso!");
    cartStore.clearCart();
  } catch (error) {
    console.error("Erro no checkout: ", error);
    alert("Falha ao finalizar a compra, tente novamente.");
  }
};
</script>