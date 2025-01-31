<script setup lang="ts">
import { useTicketStore } from "../store/ticketStore";

const store = useTicketStore();
</script>
<!-- if (tickets exist) show tickets 
 else show message  -->
<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
    <ul v-if="store.cart.length" class="mt-4">
      <li
        v-for="ticket in store.cart"
        :key="ticket.id"
        class="p-4 border rounded mb-2 flex justify-between items-center"
      >
        <span>{{ ticket.name }} - ${{ ticket.price }}</span>
        <button
          @click="store.removeFromCart(ticket.id)"
          class="bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </li>
    </ul>
    <p v-else class="text-gray-500">Your cart is empty.</p>
  </div>
</template>
