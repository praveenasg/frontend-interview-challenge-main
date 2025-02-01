<script setup lang="ts">
import { computed } from "vue";
import { useTicketStore } from "../store/ticketStore";

const store = useTicketStore();

// Compute total price of items in the cart
const totalPrice = computed(() =>
  store.cart.reduce((sum, ticket) => sum + ticket.price, 0)
);
</script>
<!-- if (tickets exist) show tickets 
 else show message  -->
<template>
  <div class="p-4 sm:p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl sm:text-3xl font-bold mb-4 text-center">
      Shopping Cart
    </h1>

    <ul v-if="store.cart.length" class="mt-4 space-y-3">
      <li
        v-for="ticket in store.cart"
        :key="ticket.id"
        class="p-4 border rounded-lg flex flex-col sm:flex-row"
        :class="
          ticket.isVIP
            ? 'bg-yellow-100 border-yellow-500 shadow-lg'
            : 'bg-gray-100 border-gray-300'
        "
      >
        <!--Name and Vip Badge -->
        <div
          class="flex flex-col sm:flex-row items-center sm:items-center gap-2 w-full"
        >
          <div class="flex items-center gap-2">
            <h2 class="text-lg font-bold">{{ ticket.name }}</h2>
            <span
              v-if="ticket.isVIP"
              class="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              VIP
            </span>
          </div>
        </div>

        <!-- Price and Remove Button -->
        <div class="flex flex-col items-center sm:flex-row sm:gap-4 mt-3">
          <span class="text-lg font-semibold text-gray-700"
            >${{ ticket.price }}</span
          >
          <button
            @click="store.removeFromCart(ticket.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm sm:text-base w-full sm:max-w-3xs mt-2 sm:mt-0"
          >
            Remove
          </button>
        </div>
      </li>
    </ul>

    <p v-else class="text-gray-500 text-center mt-6">Your cart is empty.</p>

    <!-- Total price section -->
    <div v-if="store.cart.length" class="mt-6 text-lg font-semibold text-right">
      Total: <span class="text-green-600">${{ totalPrice }}</span>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between mt-6">
      <button
        @click="$router.push('/')"
        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm sm:text-base"
      >
        Continue Shopping
      </button>
      <button
        v-if="store.cart.length"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm sm:text-base"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
