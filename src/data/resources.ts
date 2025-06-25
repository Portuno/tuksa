export type Resource = {
  name: string;
  description: string;
  url: string;
};

export const resources: Resource[] = [
  {
    name: "Contrato de Alquiler Residencial",
    description: "Modelo de contrato para alquiler de vivienda, editable en Word.",
    url: "/recursos/contrato-alquiler-residencial.docx",
  },
  {
    name: "Contrato de Venta de Inmueble",
    description: "Plantilla para compraventa de propiedad, lista para personalizar.",
    url: "/recursos/contrato-venta-inmueble.docx",
  },
  {
    name: "Planilla de Control de Pagos (Excel)",
    description: "Excel para llevar el control de pagos de alquiler o expensas.",
    url: "/recursos/planilla-control-pagos.xlsx",
  },
  {
    name: "Checklist de Entrega de Propiedad",
    description: "Lista de verificación para entrega y recepción de inmuebles.",
    url: "/recursos/checklist-entrega.pdf",
  },
]; 