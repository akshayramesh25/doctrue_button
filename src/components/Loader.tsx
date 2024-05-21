import React from "react";
import { Logo } from "../assets/icons/Icons";

const Loader = () => {
  return (
    <div className="bg-selectedTareek backdrop-blur-sm absolute flex justify-center items-center h-screen w-full top-0 bottom-0 left-0 right-0">
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  );
};

export default Loader;
