"use client";
import React, { use, useState } from "react";
import details from "./details.json"

const ChatPage = () => {
  
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [submitted , setSubmittes] = useState(false);

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    setSubmittes(true);

    try {
      // Prepare the data to be sent to the server
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data: details, userInput: prompt}),
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
      setReply(data);
      console.log(data);
    
    } catch (error) {
      console.error("Error sending data to server:", error.message);
    }
  };

  return (
    <div className="px-[100px]">
      <form method="post" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-5 h-[300px] flex-col ">
        { submitted &&( 
        <div >
            <p className="flex justify-end py-5 px-7 bg-[#4F86E7] text-white rounded-lg">{prompt }</p>
              
          </div>)
          }
          <div className="flex justify-start">
            { submitted &&( 
        <div >
            <p className="flex justify-end py-5 px-7 bg-[#fff] rounded-lg">{reply }</p>
              
          </div>)
          }
          </div>

          
          
          <input type="text" className="py-3 px-5" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
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
