import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Cart from "./Cart";

describe("Cart", () => {
  it("displays an empty cart message when there are no items", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});