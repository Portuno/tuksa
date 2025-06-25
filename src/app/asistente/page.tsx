import Header from "../../components/Header";
import dynamic from "next/dynamic";

const AsistenteBotChat = dynamic(() => import("../../components/AsistenteBotChat"), { ssr: false });

export default function AsistentePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <section className="max-w-3xl mx-auto w-full px-4 py-16 flex flex-col items-center">
        <AsistenteBotChat />
      </section>
      <footer className="w-full text-center py-6 mt-auto text-gray-500 text-sm bg-white border-t">
        © {new Date().getFullYear()} Tuksa. Todos los derechos reservados.
      </footer>
    </main>
  );
} 