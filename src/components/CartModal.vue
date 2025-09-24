<template>
  <main>
    <div v-if="visivel" class="modal-backdrop">
      <div class="modal-content">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <h1 class="text-2xl font-bold text-gray-800">
                Shopping Cart
            </h1>
            <button class="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:cursor-pointer" @click="$emit('fechar')"> X </button>
        </div>
        <br>
        <!-- if cart is empty, show a emoji cart and the subtitle "Your cart is empty" and dont show the payment button, else: show the products -->
        <br>

            <!-- buttons for cancel and payment -->
        <div class="flex flex-row gap-2"> 
          <button
            @click="$emit('fechar')"
            class="hover:cursor-pointer rounded-lg w-60 h-10 bg-gray-300 hover:bg-gray-500 transition-colors duration-200 font-medium"
          >
            Close
          </button>
          <br />
          <!-- make this button save the product  METHOD: UPDATE -->
          <button
            @click="$emit('fechar')"
            class="hover:cursor-pointer rounded-lg w-60 h-10 bg-green-400 text-white hover:bg-green-500 transition-colors duration-200 font-medium"
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { watch } from "vue";
defineProps(
  {
    visivel: {
      type: Boolean,
      required: true,
    },
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
</script>

<script>
export default {
  name: "Cart",
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
  height: 600px;
  display: flex;
  flex-direction: column;
}
</style>