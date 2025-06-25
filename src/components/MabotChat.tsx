"use client";
import React, { useState, useRef, useEffect } from "react";

// Tipos
interface Message {
  role: "user" | "assistant";
  content: string;
}

function getOrCreateChatId(): string {
  if (typeof window === "undefined") return "";
  let chatId = sessionStorage.getItem("mabot_chat_id");
  if (!chatId) {
    chatId = crypto.randomUUID();
    sessionStorage.setItem("mabot_chat_id", chatId);
  }
  return chatId;
}

const MabotChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatId, setChatId] = useState<string>("");

  useEffect(() => {
    setChatId(getOrCreateChatId());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enviar mensaje al bot vía API interna
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !chatId) return;
    setLoading(true);
    setError(null);
    const userMsg: Message = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/mabot-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          chat_id: chatId,
        }),
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("El bot requiere autenticación. Contactá al soporte.");
        throw new Error("Error al contactar al agente");
      }
      const data = await res.json();
      const botMsg = data.reply || "(Sin respuesta)";
      setMessages((msgs) => [...msgs, { role: "assistant", content: botMsg }]);
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4 flex flex-col border border-gray-100">
      <h2 className="text-xl font-bold text-blue-700 mb-2">Chat con el agente</h2>
      <div className="flex-1 overflow-y-auto mb-4 max-h-80" aria-label="Mensajes del chat">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center py-8">¡Hola! ¿En qué puedo ayudarte hoy?</div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              tabIndex={0}
              aria-label={msg.role === "user" ? "Mensaje de usuario" : "Mensaje del agente"}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="flex gap-2 mt-2" onSubmit={handleSend} aria-label="Enviar mensaje al agente">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Escribí tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          aria-label="Mensaje"
          tabIndex={0}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading || !input.trim()}
          aria-label="Enviar mensaje"
        >
          {loading ? "..." : "Enviar"}
        </button>
      </form>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </section>
  );
};

export default MabotChat; 