import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./app/store";
import { addToCart } from "./features/cart/cartSlice";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function Products() {
  const dispatch = useDispatch<AppDispatch>();
    
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = await getDocs(
          collection(db, "products")
        );

        const productsData = productsCollection.docs.map((product) => ({
          id: product.id,
          ...product.data(),
        })) as Product[];

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
  <div key={product.id}>
    <h3>{product.title}</h3>

    <img
      src={product.image}
      alt={product.title}
      width="150"
    />

    <p>Price: ${product.price}</p>

    <p>{product.description}</p>

    <p>Category: {product.category}</p>

    <button
      type="button"
      onClick={() => dispatch(addToCart(product))}
    >
      Add to Cart
    </button>
  </div>
))}
    </div>
  );
}

export default Products;