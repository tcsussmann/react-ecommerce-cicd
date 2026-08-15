import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

interface UserProfile {
  name: string;
  email: string;
  address?: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      setMessage("Please log in to update your profile.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), {
        address: address,
      });

      setProfile((currentProfile) =>
        currentProfile
          ? { ...currentProfile, address: address }
          : currentProfile
      );

      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Unable to update your profile.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setProfile(null);
        setMessage("Please log in to view your profile.");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;

          setProfile(userData);
          setAddress(userData.address || "");
          setMessage("");
        } else {
          setMessage("User profile not found.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Unable to load your profile.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Profile</h2>

      {profile ? (
        <div>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>

          <p>
            <strong>Email:</strong> {profile.email}
          </p>

          <label htmlFor="address">Address:</label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />

          <button type="button" onClick={handleUpdateProfile}>
            Update Profile
          </button>

          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default Profile;