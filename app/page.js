"use client";
import React, { useState, useEffect, useRef } from "react";
import "../app/globals.css";
import CardGreen from "@/components/CardGreen";
import BubblesHome from "@/components/BubblesHome";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import Image from "next/image";

const Page = () => {
  const [message, setMessage] = useState("Nothing");
  const circlesRef = useRef([]);

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    circlesRef.current = Array.from(document.querySelectorAll(".circle"));
  }, []);

  const getRandomDelay = () => {
    return Math.random() * 2000 + "ms";
  };

  const moveCircle = (event) => {
    const circle = event.target;

    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;

    circle.style.transition = "transform 0.5s ease";
    circle.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    circlesRef.current.forEach((circle) => {
      const circleRect = circle.getBoundingClientRect();
      const circleX = circleRect.left + circleRect.width / 2;
      const circleY = circleRect.top + circleRect.height / 2;

      const deltaX = mouseX - circleX;
      const deltaY = mouseY - circleY;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const maxDistance = 150;

      if (distance < maxDistance) {
        circle.style.transition = "transform 0.5s ease";
        circle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      } else {
        circle.style.transition = "transform 0.5s ease";
        circle.style.transform = "translate(0, 0)";
      }
    });
  };

  return (
    <>
      <div className="relative" onMouseMove={handleMouseMove}>
        <BubblesHome />
        <div className="z-10">
          <p className="text-7xl text-center text-[#212121] font-semibold mt-24 tracking-wide">
            Decentralized
          </p>

          <p className="text-7xl text-center  text-[#4F86E7] font-semibold tracking-wide">
            Health Care Platform
          </p>

          <p className="text-7xl text-center  text-[#212121] font-semibold tracking-wide">
            AI - Assisted
          </p>
          <p className="text-2xl text-center text-[#4d4d4d] font-semibold tracking-wide">
            Made for{" "}
            <span
              className="text-2xl text-center font-semibold tracking-wide"
              style={{
                backgroundImage: "linear-gradient(to right, #ff6347, #32cd32)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Hack'o Holics
            </span>
          </p>
          <section className="py-16">
            <div className="container mx-auto text-center">
              <p className="text-lg text-gray-600">
                Tangled is a unified digital platform where patient details are
                stored in a secure manner using decentralization
              </p>
            </div>
          </section>

          <div className="flex justify-center">
            <button
              onClick={() => (window.location.href = "/web3")}
              className="bg-[#4F86E7] text-white font-semibold py-4 px-10  mb-[60px] rounded-full"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="flex justify-around mb-32">
          <CardGreen
            feature="Decentralized EHR"
            description="Tangled stores the information about patients in IPFS"
            techstackimage="/solidity.png"
            techstack="Solidity"
            link="/web3"
          />
          <CardGreen
            feature="Predictive Analysis (AI)"
            description="Tangled uses large dataset of patient's history and can predict diagnosis"
            techstackimage="/python.png"
            techstack="Python"
            link="/diagnose"
          />
          <CardGreen
            feature="Anti Phobia (VR)"
            description="Tangled helps people with phobia to overcome them using VR environment"
            techstackimage="/unity.png"
            techstack="Unity"
            link="#"
          />
        </div>

        <PrimaryFeatures />

        <div className="flex flex-col mt-32 mb-32">
          <div className="flex justify-center">
            <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl md:text-5xl">
              How it works ?
            </h2>
          </div>

          <div className="mt-10 flex px-[10%] gap-10">
            <div className=" w-[50%] rounded-lg  flex justify-center ">
              <img
                src={"/sys_arch.png"}
                className="border-2  p-5 rounded-lg object-contain"
              />
            </div>
            <div className="w-[50%] py-10">
              <p className="text-left text-md px-10 text-gray-600">
                <ol className="list-decimal ">
                  <li>
                    Data entered by doctors is uploaded into the DApp as a file
                  </li>
                  <li>
                    The uploaded file is then encrypted using a unique
                    cryptographic public-key encryption technique
                  </li>
                  <li>
                    IPFS hash code for the encrypted file is sent to the Cloud
                  </li>
                  <li>
                    Processed file is stored in the form of Directed Acyclic
                    Graph data structure where the contents are sent through the
                    IPFS to the blockchain
                  </li>
                  <li>
                    Status of the file storage is notified and the status update
                    is given to contract
                  </li>
                  <li>
                    The data stored in the cloud is then utilized by a machine
                    learning model to predict the diagnosis
                  </li>
                  <li>
                    Smart Contract is deployed and the transaction is sent to
                    the BlockChain
                  </li>
                  <li>
                    With the status of the transaction being notified to the app
                  </li>
                  <li>
                    An NFT is generated automatically for a proof of the user
                    when that hash code is entered will be checked and validated
                  </li>
                  <li>
                    The verification of the user status is updated through the
                    smart contract
                  </li>
                  <li>
                    Finally, Verification of the user data is approved or
                    disapproved based on the validation
                  </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
