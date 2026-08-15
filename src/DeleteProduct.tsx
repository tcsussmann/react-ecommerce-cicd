import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

function DeleteProduct() {
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");

  const handleDeleteProduct = async () => {
    if (!productId) {
      setMessage("Please enter a product ID.");
      return;
    }

    try {
      await deleteDoc(doc(db, "products", productId));

      setMessage("Product deleted successfully!");
      setProductId("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to delete product.");
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>

      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(event) => setProductId(event.target.value)}
      />

      <button type="button" onClick={handleDeleteProduct}>
        Delete Product
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteProduct;