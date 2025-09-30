<template>
  <main>
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-sky-200 to-sky-300 flex justify-center items-center"
    >
      <form @submit.prevent="fazerLogin">
        <div
          class="bg-white p-5 rounded-2xl shadow-2xl w-118 h-140 flex flex-col"
        >
          <div
            class="flex justify-between items-center p-6 border-b border-gray-200"
          >
            <h1 class="text-2xl font-bold text-gray-800 ml-27">
              Welcome back!
            </h1>
          </div>
          <br />
          <!-- all data must be dynamic with the database -->
          <main id="CONTEUDO" class="">
            <div id="FOTO DE PERFIL" class="flex items-center justify-center">
              <img class="w-25" src="../../public/circle.png" alt="foto" />
            </div>
            <section id="DADOS DO USUARIO">
              <br />
              <br />
              <label for="email">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                placeholder="E-mail"
                v-model="email"
                required
              />
              <br />
              <br />
              <label for="password">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                placeholder="Password"
                v-model="password"
                required
              />
              <br />
            </section>
          </main>

          <!-- buttons for cancel and save -->
          <div class="flex flex-row gap-2 mt-10">
            <button
              type="submit"
              class="hover:cursor-pointer rounded-lg w-60 h-10 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 font-medium"
            >
              Login
            </button>
            <br />
            <router-link to="/register">
              <button
                class="hover:cursor-pointer rounded-lg w-60 h-10 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 font-medium"
              >
                Dont have Login? Click here
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

const email = ref("");
const password = ref("");

const fazerLogin = async () => {
  try {
    const response = await api.post("/api/auth/login", {
      email: email.value,
      password: password.value,
    });

    console.log("Resposta do backend:", response.data);

    const token = response.data.token;
    const user = response.data.user;
    localStorage.setItem("userToken", token);
    localStorage.setItem("userId", user.id);

    router.push("/home");
  } catch (error) {
    console.error("Erro ao fazer login: ", error);
    alert("Falha no login, verifique seu e-mail e senha");
  }
  console.log("email: ", email, "senha: ", password);
};
</script>
export default {
  name: "Login",
};
<script>
</script>
