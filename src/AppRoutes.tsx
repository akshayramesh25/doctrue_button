import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./screens/Signin";

const AppRoutes = () => {
  return (
    <div className="flex">
      <Routes>
        <Route path="/" element={<Signin />} />
        {/* <Route path="/tvscreen" element={<TVscreen />} /> */}
      </Routes>
    </div>
  );
};

export default AppRoutes;
