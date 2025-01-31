import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { createPinia } from "pinia";
import { setActivePinia } from "pinia";
import Home from "../pages/index.vue";
import { useTicketStore } from "../store/ticketStore";

describe("Home.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // Test to check if the tickets are being rendered on the home screen
  it("displays available tickets", () => {
    const store = useTicketStore();
    store.addTicket({
      id: 1,
      name: "Movie Ticket",
      description: "",
      isVIP: false,
      count: 10,
      price: 15,
    });

    const wrapper = mount(Home);
    expect(wrapper.text()).toContain("Movie Ticket");
  });

  // Test to check if the items are being added to the cart on clicking "Add to cart"
  it('adds ticket to cart when clicking "Add to Cart"', async () => {
    const store = useTicketStore();
    store.addTicket({
      id: 1,
      name: "Movie Ticket",
      description: "",
      isVIP: false,
      count: 10,
      price: 15,
    });

    const wrapper = mount(Home);
    await wrapper.find("button.bg-green-500").trigger("click"); // Click "Add to Cart"

    expect(store.cart.length).toBe(1);
    expect(store.cart[0].name).toBe("Movie Ticket");
  });
});
