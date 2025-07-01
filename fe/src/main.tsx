import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Login from "./Components/login.tsx";
import Signup from "./Components/signup.tsx";
import Dashboard from "./Components/dashboard.tsx";
import Money from "./Components/money.tsx";
import Stocks from "./Components/stocks.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/money" element={<Money/>}/>
        <Route path="/stocks" element={<Stocks/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
