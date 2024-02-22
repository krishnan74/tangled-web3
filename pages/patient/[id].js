import React, { useState, useEffect } from "react";
import "./patient-page.css";
import { Inter, Lexend_Deca } from "next/font/google";
import { Web3ProviderContextProvider } from "@/context/Web3ProviderContext";
import PatientPage from "./PatientPage";
import Navbar from "@/components/Navbar";

const lexend = Lexend_Deca({ subsets: ["latin-ext"] });

const Page = () => {
  return (
    <Web3ProviderContextProvider>
      <div className={lexend.className}>
        <Navbar />
        <PatientPage />
      </div>
    </Web3ProviderContextProvider>
  );
};

export default Page;
