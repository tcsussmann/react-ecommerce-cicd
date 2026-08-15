import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;