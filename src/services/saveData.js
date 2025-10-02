import api from './api'

export function useSaveData() {
  const saveChanges = async (user, oldPassword, newPassword) => {
    if (!user || !user.id) {
      console.error("Tentativa de salvar sem um usuário válido.");
      return;
    }

    try {
      await api.put(`/api/Users/${user.id}`, user);

      if (newPassword) {
        await api.put(`/api/Users/password/${user.id}`, {
          oldPassword: oldPassword,
          newPassword: newPassword,
        });
      }

      alert("Dados atualizados com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      if (error.response) {
        console.error("Detalhes do erro do servidor:", error.response.data);
      }
    }
  };

  return {
    saveChanges
  };
}