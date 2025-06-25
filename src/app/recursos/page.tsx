import Header from "../../components/Header";
import ResourceCard from "../../components/ResourceCard";
import { resources } from "../../data/resources";

export default function RecursosPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <section className="max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Todos los recursos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource.url} resource={resource} />
          ))}
        </div>
      </section>
      <footer className="w-full text-center py-6 mt-auto text-gray-500 text-sm bg-white border-t">
        © {new Date().getFullYear()} Tuksa. Todos los derechos reservados.
      </footer>
    </main>
  );
} 