import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

interface Order {
  id: string;
  userId: string;
  products: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

      if (!user) {
        setMessage("Please log in to view your orders.");
        return;
      }

      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );

        const ordersSnapshot = await getDocs(ordersQuery);

        const ordersData = ordersSnapshot.docs.map((order) => ({
          id: order.id,
          ...order.data(),
        })) as Order[];

        setOrders(ordersData);
      } catch (error) {
        console.error(error);
        setMessage("Unable to load your orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>

      {message && <p>{message}</p>}

      {orders.length === 0 && !message ? (
        <p>No previous orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
  <button
    type="button"
    onClick={() =>
      setSelectedOrder(
        selectedOrder === order.id ? null : order.id
      )
    }
  >
    Order ID: {order.id}
  </button>

  <p>
    <strong>Total:</strong> ${order.total.toFixed(2)}
  </p>

  {order.createdAt && (
    <p>
      <strong>Date:</strong>{" "}
      {new Date(
        order.createdAt.seconds * 1000
      ).toLocaleString()}
    </p>
  )}

  {selectedOrder === order.id && (
    <div>
      <h4>Products</h4>

      {order.products.map((product) => (
        <div key={product.id}>
          <p>
            <strong>{product.title}</strong>
          </p>

          <p>Price: ${product.price.toFixed(2)}</p>

          <p>Quantity: {product.quantity}</p>

          <p>
            Product total: $
            {(product.price * product.quantity).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )}

  <hr />
</div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;