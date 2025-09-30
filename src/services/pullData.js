import { ref } from 'vue'
import api from './api'

export function useUserData() {

  const user = ref(null);
  const id = localStorage.getItem("userId");

  const pullData = async () => {
    if (!id) {
      console.error("ID do usuário não encontrado no localStorage.");
      return;
    }

    try {
      const response = await api.get(`/api/Users/${id}`);
      user.value = response.data;
      console.log("Dados do usuário carregados pelo composable:", user.value);
    } catch (error) {
      console.error("Erro ao puxar dados do servidor:", error);
    }
  };

  return {
    user,
    pullData
  };
}