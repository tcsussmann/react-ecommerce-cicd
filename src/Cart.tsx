import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./app/store";
import { removeFromCart, clearCart } from "./features/cart/cartSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in before placing an order.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        products: items,
        total: total,
        createdAt: serverTimestamp(),
      });

      dispatch(clearCart());

      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to place order.");
    }
  };

  return (
    <div>
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>

              <p>Price: ${item.price.toFixed(2)}</p>

              <p>Quantity: {item.quantity}</p>

              <p>
                Item total: ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>

              <hr />
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>

          <button type="button" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>

          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;