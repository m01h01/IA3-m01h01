import React from "react";
import { useAuth } from "../context/AuthProvider";

function UserProfile() {
  const { user } = useAuth();

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <>
          <img src={user.picture} alt="User" />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
}

export default UserProfile;