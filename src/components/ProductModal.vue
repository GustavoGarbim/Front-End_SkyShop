<template>
  <main>
    <div v-if="visivel" class="modal-backdrop">
      <div class="modal-content">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <h1 class="text-2xl font-bold text-gray-800">
                Add New Product
            </h1>
            <button class="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:cursor-pointer" @click="$emit('fechar')"> X </button>
        </div>
        <br>
        <label for="name">Product Image URL</label>
        <input
          type="url"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
          placeholder="https://example.com/image.jpg"
          required
        />
        <br>

        <label for="name">Product Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter product name"
          required
        />
        <br>

        <label for="name">Price ($)</label>
        <input
          type="number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
          step="0.01"
          min="0"
          placeholder="Enter product price"
          required
        />
        <br>

        <label for="name">Description</label>
        <input
          type="url"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Enter product description"
          required
        />
        <br>




            <!-- buttons for cancel and save -->
        <div class="flex flex-row gap-2"> 
          <button
            @click="$emit('fechar')"
            class="hover:cursor-pointer rounded-lg w-60 h-10 bg-gray-400 hover:bg-gray-500 transition-colors duration-200 font-medium"
          >
            Fechar
          </button>
          <br />
          <button
            @click="$emit('fechar')"
            class="hover:cursor-pointer rounded-lg w-60 h-10 bg-sky-400 text-white hover:bg-sky-500 transition-colors duration-200 font-medium"
          >
            Salvar
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
  name: "ProductModal",
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.6);

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