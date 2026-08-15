import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        title,
        price: Number(price),
        description,
        category,
        image,
      });

      setMessage("Product added successfully!");

      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to add product.");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

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

      <button type="button" onClick={handleAddProduct}>
        Add Product
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddProduct;