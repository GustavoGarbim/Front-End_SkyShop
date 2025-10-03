<template>
  <main>
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-gradient-to-t from-sky-200 to-sky-300 flex justify-center items-center"
    >
      <form @submit.prevent="fazerCadastro">
        <div
          class="bg-white p-5 rounded-2xl shadow-2xl w-118 h-150 flex flex-col"
        >
          <div class="flex justify-center p-6 border-b border-gray-200">
            <h1 class="text-2xl font-bold text-gray-800">
              Welcome! How can I call you?
            </h1>
          </div>
          <br />

          <main id="CONTEUDO" class="">
            <div id="FOTO DE PERFIL" class="flex justify-center">
              <img class="w-25" src="../../public/circle.png" alt="foto" />
            </div>
            <section id="DADOS DO USUARIO">
              <label for="name">Name</label>
              <input
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                placeholder="Name"
                v-model="name"
                required
              />
              <br />
              <br />
              <label for="email">Email</label>
              <input
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                placeholder="E-mail"
                v-model="email"
                required
              />
              <br />
              <br />
              <label for="password">Password</label>
              <input
                type="password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                placeholder="Password"
                v-model="password"
                required
              />
              <br />
            </section>
          </main>

          <div class="flex flex-row gap-2 mt-10">
            <button
              type="submit"
              class="hover:cursor-pointer rounded-lg w-55 h-10 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 font-medium"
            >
              Register
            </button>
            <br />
            <router-link to="/">
              <button
                class="hover:cursor-pointer rounded-lg w-50 h-10 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 font-medium"
              >
                Have a Login? Click here
              </button>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const address = ref("rua montegolfier");

const fazerCadastro = async () => {
  if (password.value.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }
  try {
    const response = await api.post("/api/Users", {
      name: name.value,
      email: email.value,
      password: password.value,
      address: address.value,
    });

    console.log("Resposta do backend:", response.data);

    const token = response.data.token;
    localStorage.setItem("userToken", token);

    router.push("/");
  } catch (error) {
    console.error("Erro ao fazer cadastro: ", error);
    alert("Falha no cadastro, verifique seu e-mail e senha");
  }
};
</script>

<script>
export default {
  name: "Register",
};
</script>