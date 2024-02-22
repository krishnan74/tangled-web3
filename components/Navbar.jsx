"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext } from "react";
import { useWeb3Provider } from "@/context/Web3ProviderContext";

const Navbar = () => {
  const { connectWallet } = useWeb3Provider();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Define a function to check if a given path matches the current pathname
  const isCurrentTab = (path) => {
    return pathname === path;
  };

  return (
    <div className="flex justify-around items-center h-[109px] bg-[#F0F9FF]">
      <div className="flex justify-evenly w-[200px] items-center bg-[#4F86E7] font-bold text-white py-3 px-7 rounded-full text-3xl">
        <div className="">
          <Image
            src="/brain_white.png"
            width={80}
            height={80}
            alt="Picture of the author"
            className="mr-8"
          />
        </div>
        <div>
          <p>Tangled</p>
        </div>
      </div>

      <div className="flex w-[800px] justify-around items-center text-[#4F86E7]  rounded-lg  ">
        <Link
          href={"/"}
          className={`px-3 py-1 ${
            isCurrentTab("/") ? "border-b-2 border-[#4F86E7]" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href={"/upload"}
          className={`px-3 py-1 ${
            isCurrentTab("/upload") ? "border-b-2 border-[#4F86E7]" : ""
          }`}
        >
          Upload
        </Link>

        <Link
          href={"/mypatients"}
          className={`px-3 py-1 ${
            isCurrentTab("/mypatients") ? "border-b-2 border-[#4F86E7]" : ""
          }`}
        >
          My Patients
        </Link>

        <Link
          href={"/chatbot"}
          className={`px-3 py-1 ${
            isCurrentTab("/chatbot") ? "border-b-2 border-[#4F86E7]" : ""
          }`}
        >
          ChatBot
        </Link>
      </div>
      <div className="flex justify-end items-center bg-[#4F86E7] text-white px-5 py-2 rounded-lg">
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </div>
  );
};

export default Navbar;
