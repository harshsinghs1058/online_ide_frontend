import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./components/HomePage";
import { HashRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
