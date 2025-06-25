"use client";
import Header from "../../components/Header";
import dynamic from "next/dynamic";

const MabotChat = dynamic(() => import("../../components/MabotChat"), { ssr: false });

export default function AgentePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <section className="max-w-2xl mx-auto w-full px-4 py-16 flex flex-col items-center">
        <MabotChat />
      </section>
      <footer className="w-full text-center py-6 mt-auto text-gray-500 text-sm bg-white border-t">
        © {new Date().getFullYear()} Tuksa. Todos los derechos reservados.
      </footer>
    </main>
  );
} 