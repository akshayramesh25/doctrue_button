import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "react-dropdown/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toggle/style.css";
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
