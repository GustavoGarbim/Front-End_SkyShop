<template>
  <main>
    <div v-if="!user">Loading data...</div>
    <div v-else>
      <form @submit.prevent="saveChanges">
        <div v-if="visivel" class="modal-backdrop">
          <div class="modal-content">
            <div
              class="flex justify-between items-center p-6 border-b border-gray-200"
            >
              <h1 class="text-2xl font-bold text-gray-800">
                Hello, {{ user.name }}!
              </h1>
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
                <img
                  class="w-29"
                  src="../../public/profilepic2.png"
                  alt="foto"
                />
              </div>
              <section id="DADOS DO USUARIO">
                <label for="name">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="Full Name"
                  v-model="user.name"
                  required
                />
                <br />
                <br />
                <label for="email">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="E-mail"
                  v-model="user.email"
                  required
                />
                <br />
                <br />
                <div class="flex">
                  <label for="password">Old Password</label>
                </div>
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  id="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  v-model="oldPassword"
                />
                <br />
                <br />
                <div class="flex">
                  <label for="password">New Password</label>
                  <input
                    type="checkbox"
                    @click="togglePasswordVisibility"
                    class="inset-y-0 right-0 flex items-center pr-3 text-red-500 hover:text-red-700 ml-50"
                    aria-label="Toggle password visibility"
                  />
                  <p class="ml-2">View password</p>
                </div>
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  id="newpassword"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  v-model="newPassword"
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
                type="submit"
                class="hover:cursor-pointer rounded-lg w-60 h-10 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";
import api from "../services/api";

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

const user = ref("");
const id = localStorage.getItem("userId");

const oldPassword = ref("");
const newPassword = ref("");

const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const pullData = async () => {
  try {
    const response = await api.get(`/api/Users/${id}`);
    console.log("Resposta do backend: ", response.data);
    user.value = response.data;
  } catch (error) {
    console.error("Erro ao puxar dados do servidor: ", error);
    alert("Falha ao carregar dados, entre em contato com o ADM.");
  }
};

onMounted(() => {
  pullData();
});

const saveChanges = async () => {
  if (!user.value) return;

  try {
    await api.put(`/api/Users/${id}`, user.value);
    alert("Dados atualizados com sucesso!");
    await api.put(`/api/Users/password/${id}`, {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    oldPassword.value = "";
    newPassword.value = "";
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
  }
};
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
  height: 700px;
  display: flex;
  flex-direction: column;
}
</style>