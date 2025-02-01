<script setup lang="ts">
import { useTicketStore } from "../store/ticketStore";

const store = useTicketStore();
</script>

<template>
  <div class="p-4 sm:p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl sm:text-3xl font-bold mb-4 text-center">
      Available Tickets
    </h1>

    <!-- If tickets exist, show them; otherwise, show message -->
    <ul v-if="store.tickets.length" class="mt-4 space-y-3">
      <li
        v-for="ticket in store.tickets"
        :key="ticket.id"
        class="p-4 border rounded-lg flex flex-col sm:flex-row items-center text-center"
        :class="
          ticket.isVIP
            ? 'bg-yellow-100 border-yellow-500 shadow-lg'
            : 'bg-gray-100 border-gray-300'
        "
      >
        <!-- Name Description and VIP badge -->
        <div class="flex flex-col sm:flex-row items-center gap-2 m-3 w-full">
          <div class="flex items-center gap-2">
            <h2 class="text-lg font-bold">{{ ticket.name }}</h2>
            <span
              v-if="ticket.isVIP"
              class="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              VIP
            </span>
          </div>
          <p class="text-sm sm:text-base text-gray-600">
            {{ ticket.description }}
          </p>
        </div>

        <!-- Price and Add to cart button -->
        <div
          class="flex flex-col w-full sm:max-w-3xs items-center sm:flex-row sm:gap-4"
        >
          <span class="text-lg font-semibold text-gray-700"
            >${{ ticket.price }}</span
          >
          <button
            @click="store.addToCart(ticket)"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm w-full"
          >
            Add to Cart
          </button>
        </div>
      </li>
    </ul>

    <p v-else class="text-gray-500 text-center mt-6">No tickets available.</p>

    <!-- Cart Button -->
    <button
      @click="$router.push('/cart')"
      class="bg-blue-500 mt-2 float-end hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm sm:text-base shadow-md"
    >
      Your Cart
    </button>
  </div>
</template>
