<script setup lang="ts">
import { useTicketStore } from "../store/ticketStore";

const store = useTicketStore();
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Available Tickets</h1>

    <!-- if (tickets exist)  show tickets
     else show message -->

    <ul v-if="store.tickets.length" class="mt-4">
      <li
        v-for="ticket in store.tickets"
        :key="ticket.id"
        class="p-4 border rounded mb-2 flex justify-between items-center"
        :class="
          ticket.isVIP ? 'bg-yellow-100 border-yellow-500' : 'bg-gray-100'
        "
      >
        <div>
          <h2 class="font-bold">{{ ticket.name }} - ${{ ticket.price }}</h2>
          <p>{{ ticket.description }}</p>
        </div>
        <button
          @click="store.addToCart(ticket)"
          class="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add to Cart
        </button>
      </li>
    </ul>
    <p v-else class="text-gray-500">No tickets available.</p>

    <!-- Navigation shopping cart -->
    <button
      @click="$router.push('/cart')"
      class="bg-blue-500 text-white float-right px-3 py-1 rounded"
    >
      Your Cart
    </button>
  </div>
</template>
