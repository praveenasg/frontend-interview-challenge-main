import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { createPinia } from "pinia";
import { setActivePinia } from "pinia";
import Cart from "../pages/cart.vue";
import { useTicketStore } from "../store/ticketStore";

describe("Cart.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // Test to check if the items are being added to the cart
  it("displays items in the cart", () => {
    const store = useTicketStore();
    store.addToCart({
      id: 1,
      name: "VIP Ticket",
      description: "",
      isVIP: true,
      count: 1,
      price: 100,
    });

    const wrapper = mount(Cart);
    expect(wrapper.text()).toContain("VIP Ticket");
  });

  // Test to check if the item is being removed from the cart on clicking "Remove"
  it('removes an item from the cart when clicking "Remove"', async () => {
    const store = useTicketStore();
    store.addToCart({
      id: 1,
      name: "VIP Ticket",
      description: "",
      isVIP: true,
      count: 1,
      price: 100,
    });

    const wrapper = mount(Cart);
    await wrapper.find("button.bg-red-500").trigger("click"); // Click "Remove"

    expect(store.cart.length).toBe(0);
  });
});
