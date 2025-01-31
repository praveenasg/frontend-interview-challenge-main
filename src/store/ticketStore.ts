// Import the defineStore function from Pinia to create a store
import { defineStore } from "pinia";
// Import the ref and watch functions from Vue to manage reactive state
import { ref, watch } from "vue";

// Define the interface for a Ticket object
interface Ticket {
  id: number;
  name: string;
  description: string;
  isVIP: boolean;
  count: number;
  price: number;
}

export const useTicketStore = defineStore("ticketStore", () => {
  // Initialize the tickets array with data from local storage, or an empty array if no data is found
  const tickets = ref<Ticket[]>(
    JSON.parse(localStorage.getItem("tickets") || "[]")
  );

  // Initialize the cart array with data from local storage, or an empty array if no data is found
  const cart = ref<Ticket[]>(JSON.parse(localStorage.getItem("cart") || "[]"));

  // Function to add a new ticket to the store
  const addTicket = (ticket: Ticket) => {
    // Add the new ticket to the tickets array with a unique id
    tickets.value.push({ ...ticket, id: Date.now() });
  };

  // Function to remove a ticket from the store by its id
  const removeTicket = (id: number) => {
    // Filter the tickets array to remove the ticket with the specified id
    tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
  };

  // Function to add a ticket to the cart
  const addToCart = (ticket: Ticket) => {
    // Add the ticket to the cart array
    cart.value.push(ticket);
  };

  // Function to remove a ticket from the cart by its id
  const removeFromCart = (id: number) => {
    // Filter the cart array to remove the ticket with the specified id
    cart.value = cart.value.filter((ticket) => ticket.id !== id);
  };

  // Function to clear all tickets from the store
  const clearAllTickets = () => {
    // Reset the tickets array to an empty array
    tickets.value = [];
    // Remove the tickets data from local storage
    localStorage.removeItem("tickets");
  };

  // Watch the tickets array for changes and update local storage accordingly
  watch(
    tickets,
    (newTickets) => {
      // Update the tickets data in local storage
      localStorage.setItem("tickets", JSON.stringify(newTickets));
    },
    { deep: true }
  );

  // Watch the cart array for changes and update local storage accordingly
  watch(
    cart,
    (newCart) => {
      // Update the cart data in local storage
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    { deep: true }
  );

  // Return the store's state and actions
  return {
    tickets,
    cart,
    addTicket,
    removeTicket,
    addToCart,
    removeFromCart,
    clearAllTickets,
  };
});
