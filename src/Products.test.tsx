import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Products from "./Products";

vi.mock("./firebaseConfig", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
}));

import { getDocs } from "firebase/firestore";

describe("Products and Cart integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getDocs).mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({
            title: "Test Product",
            price: 29.99,
            description: "A test product",
            category: "Test",
            image: "test.jpg",
          }),
        },
      ],
    } as never);

    store.dispatch({ type: "cart/clearCart" });
  });

  it("adds a product to the cart when Add to Cart is clicked", async () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    const addButton = await screen.findByRole("button", {
      name: "Add to Cart",
    });

    fireEvent.click(addButton);

    const state = store.getState();

    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].title).toBe("Test Product");
    expect(state.cart.items[0].quantity).toBe(1);
  });
});