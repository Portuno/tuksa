"use client";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialForm = {
  plataforma: "linkedin",
  tematica: "",
  objetivo: "educar",
  publico_objetivo: "",
  tono: "profesional",
  idioma: "español",
};

function getOrCreateChatId(): string {
  if (typeof window === "undefined") return "";
  let chatId = sessionStorage.getItem("asistente_chat_id");
  if (!chatId) {
    chatId = crypto.randomUUID();
    sessionStorage.setItem("asistente_chat_id", chatId);
  }
  return chatId;
}

const AsistenteBotChat: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatId(getOrCreateChatId());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatId) return;
    setLoading(true);
    setError(null);
    const plainTextMsg =
      `Plataforma: ${form.plataforma}\n` +
      `Objetivo: ${form.objetivo}\n` +
      `Público objetivo: ${form.publico_objetivo}\n` +
      `Tono: ${form.tono}\n` +
      `Idioma: ${form.idioma}\n` +
      `Temática: ${input}`;
    const userMsg: Message = {
      role: "user",
      content: plainTextMsg,
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/asistente-bot-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          chat_id: chatId,
        }),
      });
      if (!res.ok) {
        throw new Error("Error al contactar al asistente");
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
    <section className="w-full max-w-xl mx-auto bg-white rounded-lg shadow p-4 flex flex-col border border-gray-100">
      <h2 className="text-xl font-bold text-blue-700 mb-2">Asistente Generador de Contenido</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" onSubmit={handleSend}>
        <div>
          <label className="block text-sm font-medium mb-1">Plataforma</label>
          <select name="plataforma" value={form.plataforma} onChange={handleFormChange} className="w-full border rounded px-2 py-1">
            <option value="linkedin">LinkedIn</option>
            <option value="x">X (Twitter)</option>
            <option value="instagram">Instagram</option>
            <option value="hilo">Hilo (X)</option>
            <option value="blog">Blog</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Objetivo</label>
          <select name="objetivo" value={form.objetivo} onChange={handleFormChange} className="w-full border rounded px-2 py-1">
            <option value="educar">Educar</option>
            <option value="inspirar">Inspirar</option>
            <option value="informar">Informar</option>
            <option value="entretener">Entretener</option>
            <option value="vender">Vender</option>
            <option value="anunciar">Anunciar</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Público objetivo</label>
          <input name="publico_objetivo" value={form.publico_objetivo} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tono</label>
          <select name="tono" value={form.tono} onChange={handleFormChange} className="w-full border rounded px-2 py-1">
            <option value="profesional">Profesional</option>
            <option value="cercano">Cercano</option>
            <option value="técnico">Técnico</option>
            <option value="emocional">Emocional</option>
            <option value="humorístico">Humorístico</option>
            <option value="persuasivo">Persuasivo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Idioma</label>
          <input name="idioma" value={form.idioma} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Temática / Input breve</label>
          <input name="tematica" value={input} onChange={(e) => setInput(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="¿Sobre qué tema necesitas el contenido?" />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={loading || !input.trim()} aria-label="Generar contenido">
            {loading ? "Generando..." : "Generar contenido"}
          </button>
        </div>
      </form>
      <div className="flex-1 overflow-y-auto mb-4 max-h-80" aria-label="Mensajes del chat">
        {messages.map((msg, idx) => (
          <div key={idx} className={`my-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-xl break-words text-sm ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`} tabIndex={0} aria-label={msg.role === "user" ? "Mensaje de usuario" : "Respuesta del asistente"}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </section>
  );
};

export default AsistenteBotChat; 