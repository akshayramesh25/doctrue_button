import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./screens/Signin";
import AllDoctors from "./screens/AllDoctors";
import ChooseHosp from "./screens/ChooseHosp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/admin" element={<ChooseHosp />} />
      <Route path="/:hospital_id" element={<AllDoctors />} />
    </Routes>
  );
};

export default AppRoutes;
