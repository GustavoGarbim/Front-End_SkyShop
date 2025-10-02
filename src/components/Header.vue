<template>
  <main
    class="h-20 flex justify-start space-x-276 custom-div bg-[aliceblue] shadow-lg border-b-2 border-sky-200"
  >
    <div class="ml-5 flex items-center">
      <router-link to="/">
        <button class="text-3xl font-bold text-sky-600 hover:cursor-pointer">
          SkyShop
        </button>
      </router-link>
      <p class="w-40 ml-4 text-sm text-gray-500">Premium E-commerce</p>
    </div>
    <div class="flex content-center space-x-3">
      <button
        @click="abrirAddProductModal"
        class="hover:cursor-pointer mt-4 w-35 h-10 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
      >
        + Add Product
      </button>
      <AddProductModal
        :visivel="modalAddProductAberto"
        @fechar="fecharAddProductModal"
      />
      <button
        @click="abrirCartModal"
        class="hover:cursor-pointer mt-4 w-35 h-10 bg-sky-200 hover:bg-sky-300 text-gray-600 px-4 py-2 rounded-lg gap-2 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
      >
        🛒 Cart
        <span
          v-if="cartStore.cartItemCount > 0"
          class="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
        >
          {{ cartStore.cartItemCount }}
        </span>
      </button>
      <CartModal :visivel="modalCartAberto" @fechar="fecharCartModal" />
      <button
        v-if="user"
        @click="abrirUserModal"
        class="flex items-center hover:cursor-pointer mt-4 min-w-35 max-w-xs h-10 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg gap-2 transition-all duration-200 transform hover:scale-105"
      >
        🙍 Hi, {{ user.name.split(" ")[0] }}!
      </button>
      <UserModal :visivel="modalUserAberto" @fechar="fecharUserModal" />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useUserData } from "../services/pullData";

const { user, pullData } = useUserData();
onMounted(() => {
  pullData();
});

const cartStore = useCartStore();
</script>

<script>
import AddProductModal from "./AddProductModal.vue";
import CartModal from "./CartModal.vue";
import UserModal from "./UserModal.vue";

export default {
  components: { AddProductModal, CartModal, UserModal },
  name: "Header",
  data() {
    return {
      modalAddProductAberto: false,
      modalCartAberto: false,
      modalUserAberto: false,
    };
  },
  methods: {
    abrirAddProductModal() {
      console.log("1. Botão de abrir foi clicado!");
      this.modalAddProductAberto = true;
      console.log(
        '2. Estado "modalAddProductAberto" agora é:',
        this.modalAddProductAberto
      );
    },

    fecharAddProductModal() {
      this.modalAddProductAberto = false;
    },

    abrirCartModal() {
      console.log("1. Botão de abrir foi clicado!");
      this.modalCartAberto = true;
      console.log('2. Estado "modalCartAberto" agora é:', this.modalCartAberto);
    },

    fecharCartModal() {
      this.modalCartAberto = false;
    },

    abrirUserModal() {
      console.log("1. Botão de abrir foi clicado!");
      this.modalUserAberto = true;
      console.log('2. Estado "modalUserAberto" agora é:', this.modalUserAberto);
    },

    fecharUserModal() {
      this.modalUserAberto = false;
    },
  },
};
</script>