import React from "react";
import Link from "next/link";

const navItems = [
  { href: "/recursos", label: "Recursos" },
  { href: "/agente", label: "Agente" },
  { href: "/asistente", label: "Asistente" },
];

const Header: React.FC = () => (
  <header className="w-full bg-white shadow-sm sticky top-0 z-50">
    <nav
      className="flex items-center justify-between max-w-5xl mx-auto px-4 py-3"
      aria-label="Navegación principal"
    >
      <Link href="/" className="flex items-center gap-2" tabIndex={0} aria-label="Ir al inicio">
        <span className="text-xl font-bold tracking-tight text-blue-600">Tuksa</span>
      </Link>
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              tabIndex={0}
              aria-label={`Ir a ${item.label}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Header; 