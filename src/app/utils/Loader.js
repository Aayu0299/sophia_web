import React from "react";
import { useLoader } from "../context/LoaderContext";

// function for loader
const Loader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-(--overlay) z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-(--darkblue) border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-(--darkblue) rounded-full animate-ping opacity-80"></div>
      </div>
    </div>
  );
};

export default Loader;
