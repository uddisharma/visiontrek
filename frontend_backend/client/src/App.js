import { React, useState, useEffect } from "react";
import "./App.css";
function App() {
  return (
    <div className="App">
      <h1>this is home page</h1>
      <form action="/register" method="POST">
        <input type="text" placeholder="first name" required name="firstname" />
        <input type="text" placeholder="last name" required name="lastname" />
        <input type="email" placeholder="Email" required name="email" />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
        />
        <input
          type="password"
          placeholder="confirm password"
          required
          name="cpassword"
        />

        <button type="submit">register</button>
      </form>
      <form action="/login" method="POST">
        <input type="email" required placeholder="email" name="email" />
        <input
          type="password"
          required
          placeholder="password"
          name="password"
        />
        <input type="number" name="otp" required placeholder="OTP" />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default App;
