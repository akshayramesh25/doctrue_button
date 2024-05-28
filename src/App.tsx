import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import UserContext from "./lib/contexts/UserContext";
import HospitalDoctorContext from "./lib/contexts/HospitalDoctorContext";
import PatientBookingContext from "./lib/contexts/PatientBookingContext";

import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <HospitalDoctorContext>
          <PatientBookingContext>
            <AppRoutes />
          </PatientBookingContext>
        </HospitalDoctorContext>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
