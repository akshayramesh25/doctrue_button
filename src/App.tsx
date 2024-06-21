import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import UserContext from "./lib/contexts/UserContext";
import HospitalDoctorContext from "./lib/contexts/HospitalDoctorContext";

import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <HospitalDoctorContext>
          <ToastContainer />
          <AppRoutes />
        </HospitalDoctorContext>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
