import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "./context/AuthProvider";
import UserProfile from "./components/UserProfile";

function App() {
  const [profile, setProfile] = useState(null);
  const { user, setUser } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUser(tokenResponse);
      fetchUserProfile(tokenResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const fetchUserProfile = (accessToken) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setUser({
          ...user,
          picture: res.data.picture,
          name: res.data.name,
          email: res.data.email,
        });
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  };

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <UserProfile />
      {profile ? (
        <div>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => login()}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
