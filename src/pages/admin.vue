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

// Adds a new ticket to the store.
// This function validates the input values, creates a new ticket object, and adds it to the store.
// It also resets the form fields to their initial values after adding the ticket.

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
  <div class="p-4 sm:p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl sm:text-3xl font-bold mb-4 text-center">
      Admin - Create Tickets
    </h1>

    <!-- Add Tickets Form -->
    <form
      @submit.prevent="addTicket"
      class="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg"
    >
      <input
        v-model="ticketName"
        type="text"
        placeholder="Ticket Name"
        class="w-full p-2 border rounded mb-3 text-sm sm:text-base"
        required
      />
      <textarea
        v-model="description"
        placeholder="Description"
        class="w-full p-2 border rounded mb-3 text-sm sm:text-base"
      ></textarea>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label class="flex items-center">
          <input type="checkbox" v-model="isVIP" class="mr-2" />
          <span class="text-sm sm:text-base">VIP Ticket</span>
        </label>
        <div class="sm:flex items-center gap-2">
          <span class="text-sm sm:text-base">Count</span>
          <input
            v-model="count"
            type="number"
            placeholder="Available Count"
            class="w-full p-2 border rounded text-sm sm:text-base"
            required
          />
        </div>
        <div class="sm:flex items-center gap-2">
          <span class="text-sm sm:text-base">Price</span>
          <input
            v-model="price"
            type="number"
            placeholder="Price"
            class="w-full p-2 border rounded text-sm sm:text-base"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm sm:text-base"
      >
        Add Ticket
      </button>
    </form>

    <!-- Available Tickets Section -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-6">
      <h2 class="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
        Available Tickets
      </h2>
      <button
        @click="confirmClearAll"
        class="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm sm:text-base"
      >
        Clear All
      </button>
    </div>

    <!-- List individual Events -->
    <ul v-if="store.tickets.length" class="mt-4">
      <li
        v-for="ticket in store.tickets"
        :key="ticket.id"
        class="p-4 border rounded mb-2 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base"
        :class="
          ticket.isVIP
            ? 'bg-yellow-100 border-yellow-500 shadow-lg'
            : 'bg-gray-100 border-gray-300'
        "
      >
        <div class="flex items-center gap-2">
          <span class="font-bold">{{ ticket.name }}</span>
          <span
            v-if="ticket.isVIP"
            class="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            VIP
          </span>
          <span> ${{ ticket.price }}, Available - {{ ticket.count }}</span>
        </div>
        <button
          @click="store.removeTicket(ticket.id)"
          class="mt-2 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </li>
    </ul>
    <p v-else class="text-gray-500 text-center mt-4">No tickets available.</p>

    <!-- Confirm Delete Modal -->
    <ConfirmModal
      :show="showModal"
      message="Are you sure you want to delete all tickets?"
      @confirm="clearAllTickets"
      @cancel="showModal = false"
    />
  </div>
</template>
