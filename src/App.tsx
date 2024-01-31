import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import Context from "./lib/Context";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <AppRoutes />
      </Context>
    </BrowserRouter>
  );
}

export default App;
