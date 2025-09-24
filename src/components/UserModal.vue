<template>
  <main>
    <div v-if="visivel" class="modal-backdrop">
      <div class="modal-content">
        <div
          class="flex justify-between items-center p-6 border-b border-gray-200"
        >
          <h1 class="text-2xl font-bold text-gray-800">Hello, !NAME!</h1>
          <button
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:cursor-pointer"
            @click="$emit('fechar')"
          >
            X
          </button>
        </div>
        <br />

         <!-- all data must be dynamic with the database -->
        <main id="CONTEUDO" class="">
          <div id="FOTO DE PERFIL" class="flex items-center justify-center">
            <img class="w-25" src="../../public/circle.png" alt="foto" />
          </div>
          <section id="DADOS DO USUARIO">
            <label for="name">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              placeholder="{{user.name}}"
              required
            />
            <br />
            <br />
            <label for="email">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              placeholder="{{user.email}}"
              required
            />
            <br />
            <br />
            <label for="password">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              placeholder="{{user.password}}"
              required
            />
            <br />
          </section>
        </main>

        <!-- buttons for cancel and save -->
        <div class="flex flex-row gap-2 mt-10">
          <button
            @click="$emit('fechar')"
            class="hover:cursor-pointer rounded-lg w-60 h-10 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 font-medium"
          >
            Close
          </button>
          <br />
          <!-- make this button save the updates in user  METHOD: UPDATE -->
          <button
            @click="$emit('fechar')"
            class="hover:cursor-pointer rounded-lg w-60 h-10 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 font-medium"
          >
            Save
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
  name: "UserModal",
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