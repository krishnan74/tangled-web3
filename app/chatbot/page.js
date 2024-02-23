"use client";
import React, { useState } from "react";

const ChatPage = () => {
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [chatHistory, setChatHistory] = useState([]);
  const [loaderDiv, toggleLoaderDiv] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatHistory([...chatHistory, { text: formData.prompt, user: true }]);
    setFormData({ prompt: "" });

    try {
      // Prepare the data to be sent to the server
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      // Make a POST request to the Flask server
      const response = await fetch(
        "http://localhost:8080/chatbot",  // Adjust the URL if your Flask server runs on a different port or host
        requestData
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update chat history with the bot's response
      setChatHistory([...chatHistory, { text: data.text, user: false }]);
      toggleLoaderDiv(false);
    } catch (error) {
      console.error("Error sending data to server:", error.message);
      toggleLoaderDiv(false);
    }
  };

  return (
    <div className="px-[100px]">
      <div className="flex flex-col h-[400px] border rounded-lg border-black mb-10 shadow-xl overflow-y-auto">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`${
              message.user ? "text-right" : "text-left"
            } mx-4 my-2`}
          >
            <span
              className={`${
                message.user ? "bg-blue-500" : "bg-gray-300"
              } text-white px-4 py-2 rounded-lg inline-block`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>

      <form method="post" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-5 flex-col">
          <div className="flex justify-center">
            <div className="mb-4 w-[800px]">
              <input
                type="text"
                placeholder="Type your message..."
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full shadow-md px-4"
                required
              ></input>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#4F86E7] text-white font-semibold py-2 px-4 rounded-full shadow-lg"
              onClick={() => toggleLoaderDiv(true)}
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

