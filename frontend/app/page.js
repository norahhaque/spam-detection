// @ts-nocheck

"use client";

import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react"

export default function SpamChecker() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleCheck = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setIsTyping(true);
    try {
      const res = await axios.post("https://spam-detection-90cj.onrender.com/predict", { text: message });
      const reply = res.data.prediction === "spam"
        ? "❌ This is predicted to be spam! It is recommended that you block the number, report as spam, and do not engage further with the sender."
        : "✅ This is predicted to be a legitimate message!";

      setTimeout(() => {
        setHistory((prev) => [...prev, { user: message, bot: reply }]);
        setIsTyping(false);
      }, 1000);
    } catch {
      setTimeout(() => {
        setHistory((prev) => [...prev, { user: message, bot: "Error: Could not reach backend." }]);
        setIsTyping(false);
      }, 1000);
    }
    setMessage("");
    setLoading(false);
  };

  return (
    <div>
      <div className="fixed top-0 w-full flex justify-center bg-white shadow-sm z-10 text-2xl">
        <h1 className="text-gray-800 font-semibold py-3">Spam Checker</h1>
      </div>

      <div className="flex flex-col items-center justify-end min-h-screen bg-white p-4 pt-16">
        <div className="w-full max-w-md flex flex-col space-y-2 mb-4">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-end">
              <div className="bg-blue-100 text-gray-900 px-4 py-2 rounded-2xl max-w-xs shadow">
                {entry.user}
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-xs shadow">
                {entry.bot}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-xs shadow text-sm italic"
            >
              AI is typing...
            </motion.div>
          </div>
        )}
      </div>


      <div className="w-full max-w-md flex items-center bg-white rounded-full shadow px-4 py-2">
        <input
          type="text"
          className="flex-grow outline-none text-sm p-2"
          placeholder="Paste any message here for an AI spam check!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCheck();
            }
          }}
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="ml-2 px-4 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
    </div>
  );
}
