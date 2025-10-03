<template>
  <main>
    <div>
      <form @submit.prevent="handleSubmit">
        <div
          v-if="visivel"
          class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50"
        >
          <div
            class="bg-white p-5 rounded-2xl shadow-2xl w-130 h-auto flex flex-col"
          >
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
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="Full Name"
                  v-model="user.name"
                  required
                />
                <br />
                <br />
                <label for="email">Email</label>
                <input
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
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
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
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
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  v-model="newPassword"
                />
                <br />
              </section>
            </main>

            <div class="flex flex-row gap-2 mt-10">
              <button
                @click="$emit('fechar')"
                class="hover:cursor-pointer rounded-lg w-60 h-10 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 font-medium"
              >
                Close
              </button>
              <br />
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
import { useUserData } from "../services/pullData";
import { useSaveData } from "../services/saveData";

const { user, pullData } = useUserData();
onMounted(() => {
  pullData();
});

const { saveChanges } = useSaveData();

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

const oldPassword = ref("");
const newPassword = ref("");

const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handleSubmit = () => {
  saveChanges(user.value, oldPassword.value, newPassword.value);
};
</script>

<script>
export default {
  name: "UserModal",
};
</script>
