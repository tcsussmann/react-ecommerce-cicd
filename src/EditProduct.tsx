import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

function EditProduct() {
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleEditProduct = async () => {
    if (!productId) {
      setMessage("Please enter a product ID.");
      return;
    }

    try {
      await updateDoc(doc(db, "products", productId), {
        title,
        price: Number(price),
        description,
        category,
        image,
      });

      setMessage("Product updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Unable to update product.");
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>

      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(event) => setProductId(event.target.value)}
      />

      <input
        type="text"
        placeholder="Product title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />

      <button type="button" onClick={handleEditProduct}>
        Update Product
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default EditProduct;