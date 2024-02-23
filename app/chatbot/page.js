"use client";
import React, { useState } from "react";
import details from "./details.json"

const ChatPage = () => {
  

  const handleSubmit = async (e) => {
   
    e.preventDefault();

    try {
      // Prepare the data to be sent to the server
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };

      // Make a POST request to the Flask server
      const response = await fetch(
        "http://localhost:8080/chatbot",
        requestData
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);
    
    } catch (error) {
      console.error("Error sending data to server:", error.message);
    }
  };

  return (
    <div className="px-[100px]">
      <form method="post" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-5 h-[300px] flex-col ">
          

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#4F86E7] text-white font-semibold py-2 px-4 rounded-full shadow-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

     
    </div>
  );
};

export default ChatPage;
