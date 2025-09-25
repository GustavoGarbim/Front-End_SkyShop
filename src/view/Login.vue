<template>
  <main>
    <div class="login">
      <form @submit.prevent="fazerLogin">
        <div class="login-content">
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
              <label for="password">password</label>
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
            <router-link to="/register">
              <button
                class="hover:cursor-pointer rounded-lg w-60 h-10 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 font-medium"
              >
                Dont have Login? Click here
              </button>
            </router-link>
            <br />
            <button
              type="submit"
              class="hover:cursor-pointer rounded-lg w-60 h-10 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 font-medium"
            >
              Login
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
    localStorage.setItem('userId', user.id);

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

<style scoped>
.login {
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

.login-content {
  background-color: rgb(255, 255, 255);
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
}
</style>