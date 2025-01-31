import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { createPinia } from "pinia";
import { setActivePinia } from "pinia";
import Admin from "../pages/admin.vue";
import { useTicketStore } from "../store/ticketStore";

describe("admin.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Initializes Pinia for each test
  });

  // Test that the form is rendered correctly
  it("renders the form correctly", () => {
    const wrapper = mount(Admin);
    expect(wrapper.find('input[placeholder="Ticket Name"]').exists()).toBe(
      true
    );
    expect(wrapper.find("button").text()).toBe("Add Ticket");
  });

  // Test that a ticket is added when the form is submitted
  it("adds a ticket when the form is submitted", async () => {
    const wrapper = mount(Admin);
    const store = useTicketStore();

    await wrapper
      .find('input[placeholder="Ticket Name"]')
      .setValue("Concert Ticket");
    await wrapper.find('input[placeholder="Available Count"]').setValue(10);
    await wrapper.find('input[placeholder="Price"]').setValue(50);
    await wrapper.find('button[type="submit"]').trigger("submit");

    expect(store.tickets.length).toBe(1);
    expect(store.tickets[0].name).toBe("Concert Ticket");
  });

  // Test clear all functionality
  it('clears all tickets when clicking "Clear All"', async () => {
    const wrapper = mount(Admin);
    const store = useTicketStore();

    store.addTicket({
      id: 1,
      name: "Sample Ticket",
      description: "",
      isVIP: false,
      count: 5,
      price: 20,
    });
    expect(store.tickets.length).toBe(2);

    await wrapper.find("button.bg-red-600").trigger("click"); // Click Clear All
    await wrapper.find("button.bg-red-700").trigger("click"); // Click "'Yes, Delete' on the modal"
    expect(store.tickets.length).toBe(0);
  });
});
