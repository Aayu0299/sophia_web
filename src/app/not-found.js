"use client";
import React from "react";
import "./globals.css";
import { TEXT } from "./utils/Text";

//-----------function for page not found page-----------
const NotFound = () => {
  return (
    <div className="flex items-center justify-center bg-center overflow-hidden h-screen m-0 p-0">
      <div className="text-center">
        <h1 className="text-[2rem] font-bold">{TEXT.SOPHIA}</h1>
        <h2 className="text-[32px] font-semibold mb-[50px]">
          {TEXT.NOT_FOUND}
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
