import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./screens/Signin";
import TVScreen from "./screens/TVScreen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/tvscreen" element={<TVScreen />} />
    </Routes>
  );
};

export default AppRoutes;
