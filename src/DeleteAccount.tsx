import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

function DeleteAccount() {
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in before deleting your account.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);

      alert("Account deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to delete account.");
    }
  };

  return (
    <button type="button" onClick={handleDeleteAccount}>
      Delete Account
    </button>
  );
}

export default DeleteAccount;