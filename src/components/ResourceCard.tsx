"use client";

import React from "react";

type Resource = {
  name: string;
  description: string;
  url: string;
};

type ResourceCardProps = {
  resource: Resource;
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
    <p className="text-gray-600 text-sm flex-1">{resource.description}</p>
    <a
      href={resource.url}
      download
      className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
      tabIndex={0}
      aria-label={`Descargar ${resource.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          (e.target as HTMLAnchorElement).click();
        }
      }}
    >
      Descargar
    </a>
  </div>
);

export default ResourceCard; 