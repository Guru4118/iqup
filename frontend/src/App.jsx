import React from "react";
import AuthForms from "./pages/AuthForms";

function App() {
  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 700, margin: "auto" }}>
      <h1>User Authentication Demo</h1>
      <AuthForms />
    </div>
  );
}

export default App;
