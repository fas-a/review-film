import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import LandingPage from "./LandingPage";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./components/tailwind.output.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <LandingPage />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
