<template>
  <main>
    <div class="register">
      <form @submit.prevent="fazerCadastro">
        <div class="register-content">
          <div
            class="flex justify-between items-center p-6 border-b border-gray-200"
          >
            <h1 class="text-2xl font-bold text-gray-800 ml-6">
              Welcome! How can I call you?
            </h1>
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
                placeholder="Name"
                v-model="name"
                required
              />
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
            <router-link to="/">
              <button
                class="hover:cursor-pointer rounded-lg w-50 h-10 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 font-medium"
              >
                Have a Login? Click here
              </button>
            </router-link>
            <br />
            <button
              type="submit"
              class="hover:cursor-pointer rounded-lg w-55 h-10 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 font-medium"
            >
              Register
            </button>
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
const address = ref("rua montegolfier")

const fazerCadastro = async () => {
  try {
    const response = await api.post("/api/Users", {
      name: name.value,
      email: email.value,
      password: password.value,
      address: address.value
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

<style scoped>
.register {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: linear-gradient(to top, rgb(95, 191, 255), rgb(0, 104, 174));

  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
}

.register-content {
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