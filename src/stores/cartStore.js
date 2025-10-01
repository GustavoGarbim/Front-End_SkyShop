import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([])
    const cartItemCount = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    const cartTotalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    async function addToCart(product) {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Faça o login para adicionar itens ao carrinho.");
                return;
            }

            const response = await api.post('/api/carts/items', {
                productId: product.id,
                quantity: 1,
            },
                {
                    params: {
                        userId
                    }
                }
            );
            cartItems.value = response.data.items;

        } catch (error) {
            console.error('Erro ao adicionar item ao carrinho: ', error);
        }
    }

    async function fetchCart() {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;


            const response = await api.get('/api/carts', { params: { userId } });
            cartItems.value = response.data.items || [];

            const cartId = response.data.id
            console.log("Achou o ID do carrinho: ", cartId)
        } catch (error) {
            console.error('Erro ao buscar o carrinho:', error);
        }
    }

    async function removeFromCart(productId) {
        try {
            const userId = localStorage.getItem("userId");
            console.log("log do removeFromCart chegou ID do produto: ", productId)
            const response = await api.delete(`/api/carts/items/${productId}`, { params: { userId } });
            cartItems.value = response.data.items;
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
        }
    }

    async function updateQuantity(product, quantity) {
        console.log("[updateQuantity] ProductId: ", product)
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const response = await api.put(
                `/api/carts/items/${product}`,
                { quantity },
                { params: { userId } }
            );
            cartItems.value = response.data.items;
        } catch (error) {
            console.error('Erro ao atualizar a quantidade:', error);
        }
    }

    async function incrementQuantity(productId) {
        try {
            const userId = localStorage.getItem("userId");
            const response = await api.post('/api/carts/items', {
                productId,
                quantity: 1,
            },
                {
                    params: {
                        userId
                    }
                }
            );
            cartItems.value = response.data.items;

        } catch (error) {
            console.error('Erro ao adicionar item ao carrinho: ', error);
        }
    }

    async function decrementQuantity(productId) {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`api/carts/`, {
            params: {
                userId: userId
            }
        });
        let itemEncontrado = null;
        for (const item of response.data.items) {
            if (item.productId === productId) {
                itemEncontrado = item;
                break;
            }
        }
        const qnt = itemEncontrado.quantity - 1;
        if (qnt <= 0) {
            await removeFromCart(productId);
        }
        else {
            updateQuantity(productId, qnt)
        }
    }

    function clearCart() {
        cartItems.value = [];
    }

    return {
        cartItems,
        cartItemCount,
        cartTotalPrice,
        fetchCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
    }
})