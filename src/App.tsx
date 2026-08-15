import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import DeleteAccount from "./DeleteAccount";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";

function App() {
  return (
    <div>
      <h1>Firebase React E-Commerce</h1>

      <Register />

      <hr />

      <Login />

      <hr />

      <Profile />

      <hr />

      <AddProduct />

      <hr />

      <EditProduct />

      <hr />

      <DeleteProduct />

      <hr />

      <Products />

      <hr />

      <Cart />

      <hr />

      <OrderHistory />

      <hr />

      <Logout />

      <hr />

      <DeleteAccount />
    </div>
  );
}

export default App;