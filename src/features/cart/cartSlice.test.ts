import { describe, expect, it } from "vitest";
import cartReducer, { addToCart } from "./cartSlice";

const product = {
  id: "1",
  title: "Test Product",
  price: 29.99,
  description: "A test product",
  category: "Test",
  image: "test.jpg",
};

describe("cartSlice", () => {
  it("adds a product to an empty cart", () => {
    const initialState = { items: [] };

    const state = cartReducer(initialState, addToCart(product));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe("Test Product");
    expect(state.items[0].quantity).toBe(1);
  });

  it("increases quantity when the same product is added again", () => {
    const initialState = {
      items: [
        {
          ...product,
          quantity: 1,
        },
      ],
    };

    const state = cartReducer(initialState, addToCart(product));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });
});