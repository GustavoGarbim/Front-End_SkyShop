import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([])
    const cartItemCount = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    const cartTotalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    function addToCart(product) {
        const existingItem = cartItems.value.find(item => item.id === product.id)

        if (existingItem) {
            existingItem.quantity++
        } else {
            cartItems.value.push({ ...product, quantity: 1 })
        }
        console.log('Carrinho atualizado:', cartItems.value);
    }

    function removeFromCart(productId) {
        cartItems.value = cartItems.value.filter(item => item.id !== productId)
    }

    function incrementQuantity(productId) {
        const item = cartItems.value.find(item => item.id === productId)
        if (item) {
            item.quantity++
        }
    }

    function decrementQuantity(productId) {
        const item = cartItems.value.find(item => item.id === productId)
        if (item) {
            if (item.quantity > 1) {
                item.quantity--
            } else {
                removeFromCart(productId)
            }
        }
    }

    return {
        cartItems,
        cartItemCount,
        cartTotalPrice,
        addToCart,
        removeFromCart,   
        incrementQuantity,
        decrementQuantity,
    }
})