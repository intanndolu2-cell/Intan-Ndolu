import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { AppScreen, ChatMessage, DriverInfo } from "../types";
import { ArrowLeft, Send, Plus, Smile, MessageSquare, Loader } from "lucide-react";

interface ChatScreenProps {
  driver: DriverInfo;
  chatHistory: ChatMessage[];
  onNavigate: (screen: AppScreen) => void;
  onSendMessage: (message: ChatMessage) => void;
  onReceiveDriverMessage: (text: string) => void;
}

export default function ChatScreen({
  driver,
  chatHistory,
  onNavigate,
  onSendMessage,
  onReceiveDriverMessage
}: ChatScreenProps) {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " pm"
    };

    onSendMessage(userMsg);
    setInputText("");
    setIsTyping(true);

    try {
      // Call our Express server's server-side Gemini API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatHistory, userMsg],
          driverName: driver.name,
          serviceType: driver.type
        })
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.reply) {
        onReceiveDriverMessage(data.reply);
      } else {
        onReceiveDriverMessage("Siap Kak, segera meluncur sesuai peta.");
      }

    } catch (err) {
      console.error("Chat API fetch error:", err);
      setIsTyping(false);
      onReceiveDriverMessage("Siap Kak, saya sedang berkendara, agak lambat balasnya ya.");
    }
  };

  return (
    <div id="chat_screen_container" className="relative flex flex-col justify-between h-full bg-white rounded-[40px] shadow-2xl max-w-md mx-auto border-8 border-gray-900 aspect-[9/19]">
      
      {/* Header Area */}
      <div className="sticky top-0 bg-white border-b border-gray-100 pt-12 pb-3.5 px-5 flex items-center gap-3 z-30 shadow-sm">
        <button
          onClick={() => onNavigate(AppScreen.IN_TRIP)}
          className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-700 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Driver identity */}
        <div className="flex-1 flex items-center gap-2.5 text-left">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-sm">
            CW
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">{driver.name}</h4>
            <p className="text-[9px] text-gojek font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gojek inline-block animate-pulse"></span>
              Online • Mitra Gojek
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4">
        
        {chatHistory.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <MessageSquare className="w-10 h-10 text-gray-300" />
            <p className="text-xs text-gray-400 font-medium">Belum ada obrolan. Mulai obrolan untuk memberi tahu instruksi tambahan ke driver.</p>
          </div>
        )}

        {chatHistory.map((msg) => {
          const isUser = msg.sender === "user";
          const isSystem = msg.sender === "system";

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="bg-gray-200/70 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] space-y-1 ${isUser ? "text-right" : "text-left"}`}>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  isUser 
                    ? "bg-gojek text-white rounded-br-none shadow-md" 
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm"
                }`}>
                  {msg.text}
                </div>
                <span className="text-[8px] text-gray-400 font-mono block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Live typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
              <Loader className="w-3.5 h-3.5 text-gojek animate-spin" />
              <span className="text-[10px] text-gray-400 font-mono">Cameron sedang mengetik...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleSend} className="sticky bottom-0 bg-white border-t border-gray-100 p-3 flex items-center gap-2 rounded-b-[40px] z-30">
        <button
          type="button"
          onClick={() => alert("Simulasi mengirim gambar/lokasi tambahan.")}
          className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Input input box */}
        <div className="relative flex-1">
          <input
            id="chat_text_input"
            type="text"
            placeholder="Ketik pesan untuk driver..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-gray-50 hover:bg-gray-100/50 focus:bg-white pl-4 pr-10 py-3 rounded-2xl text-xs outline-none border border-gray-200 focus:border-gojek text-gray-800 transition-all"
          />
          <button
            type="button"
            onClick={() => alert("Buka pemilih Emoji.")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        {/* Send Button */}
        <motion.button
          id="btn_chat_send"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="p-3 bg-gojek hover:bg-gojek-hover text-white rounded-2xl cursor-pointer transition-colors"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>

    </div>
  );
}
