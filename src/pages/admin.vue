<script setup lang="ts">
import { ref } from "vue";
import { useTicketStore } from "../store/ticketStore";
import ConfirmModal from "../components/ConfirmModal.vue";

const store = useTicketStore();
// variables required for the form
const ticketName = ref("");
const description = ref("");
const isVIP = ref(false);
const count = ref(0);
const price = ref(0);

// implemented modal for delete all tickets functionality, this variable defines if the modal is visible or hidden
const showModal = ref(false);

/**
 * Adds a new ticket to the store.
 *
 * This function validates the input values, creates a new ticket object, and adds it to the store.
 * It also resets the form fields to their initial values after adding the ticket.
 */
const addTicket = () => {
  // Check if the required input values are valid
  // If any of the values are invalid, exit the function immediately
  if (!ticketName.value || count.value <= 0 || price.value <= 0) return;

  // Create a new ticket object
  store.addTicket({
    name: ticketName.value,
    description: description.value,
    isVIP: isVIP.value,
    count: count.value,
    price: price.value,
    id: Date.now(),
  });

  // Reset the form fields to their initial values
  ticketName.value = "";
  description.value = "";
  isVIP.value = false;
  count.value = 0;
  price.value = 0;
};

// This function handles modal visibility
const confirmClearAll = () => {
  showModal.value = true;
};

// This function handles modal confirmation
const clearAllTickets = () => {
  store.clearAllTickets();
  showModal.value = false;
};
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Admin - Create Tickets</h1>
    <form @submit.prevent="addTicket" class="bg-gray-100 p-4 rounded-lg">
      <input
        v-model="ticketName"
        type="text"
        placeholder="Ticket Name"
        class="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        v-model="description"
        placeholder="Description"
        class="w-full p-2 mb-2 border rounded"
      ></textarea>
      <div class="flex gap-2 items-center mb-2">
        <label class="flex items-center"
          ><input type="checkbox" v-model="isVIP" class="mr-2" />VIP
          Ticket</label
        >
        <input
          v-model="count"
          type="number"
          placeholder="Available Count"
          class="p-2 border rounded"
          required
        />
        <input
          v-model="price"
          type="number"
          placeholder="Price"
          class="p-2 border rounded"
          required
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Add Ticket
      </button>
    </form>

    <div class="flex justify-between items-center mt-6">
      <h2 class="text-xl font-bold">Available Tickets</h2>
      <button
        @click="confirmClearAll"
        class="bg-red-600 text-white px-3 py-2 rounded"
      >
        Clear All
      </button>
    </div>

    <ul v-if="store.tickets.length" class="mt-4">
      <li
        v-for="ticket in store.tickets"
        :key="ticket.id"
        class="p-2 border rounded mb-2 flex justify-between"
      >
        <span>{{ ticket.name }} - ${{ ticket.price }}</span>
        <button
          @click="store.removeTicket(ticket.id)"
          class="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </li>
    </ul>
    <p v-else class="text-gray-500">No tickets available.</p>

    <!-- based on the emit from the modal, it will run either clearAllTickets function or set showModal to false -->
    <ConfirmModal
      :show="showModal"
      message="Are you sure you want to delete all tickets?"
      @confirm="clearAllTickets"
      @cancel="showModal = false"
    />
  </div>
</template>
