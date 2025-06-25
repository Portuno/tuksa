import Header from "../components/Header";
import ResourceCard from "../components/ResourceCard";
import IAAgentPlaceholder from "../components/IAAgentPlaceholder";
import { resources } from "../data/resources";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <section className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gradient-to-b from-blue-50 to-transparent">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">Tuksa</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
          Recursos inmobiliarios listos para usar. Descargá contratos, planillas y más. Próximamente: tu agente de IA para resolver todas tus dudas.
        </p>
      </section>
      <section className="max-w-4xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recursos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.slice(0, 3).map((resource) => (
            <ResourceCard key={resource.url} resource={resource} />
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <a
            href="/recursos"
            className="text-blue-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
            tabIndex={0}
            aria-label="Ver todos los recursos"
          >
            Ver todos los recursos →
          </a>
        </div>
      </section>
      <IAAgentPlaceholder />
      <footer className="w-full text-center py-6 mt-auto text-gray-500 text-sm bg-white border-t">
        © {new Date().getFullYear()} Tuksa. Todos los derechos reservados.
      </footer>
    </main>
  );
}
