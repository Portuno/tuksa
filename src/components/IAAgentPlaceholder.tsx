import React from "react";

const IAAgentPlaceholder: React.FC = () => (
  <section
    className="w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 flex flex-col items-center justify-center my-8 border border-blue-200"
    aria-label="Agente de IA próximamente"
  >
    <span className="text-2xl font-bold text-blue-700 mb-2">Agente de IA</span>
    <p className="text-gray-700 text-center max-w-md">
      Próximamente podrás consultar a nuestro agente inteligente para resolver tus dudas sobre contratos, recursos y procesos inmobiliarios.
    </p>
  </section>
);

export default IAAgentPlaceholder; 