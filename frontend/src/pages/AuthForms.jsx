import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
  <GoogleLogin
    onSuccess={credentialResponse => {
      const decoded = jwt_decode(credentialResponse.credential);
      fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.name,
          googleId: decoded.sub,
        }),
      })
      .then(res => res.json())
      .then(data => console.log(data));
    }}
    onError={() => {
      console.log("Login Failed");
    }}
  />
</GoogleOAuthProvider>
