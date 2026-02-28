"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingFaqs = [
  {
    question: "¿Hay permanencia?",
    answer:
      "No, sin permanencia. Puedes cancelar tu plan en cualquier momento desde el panel de facturacion. Tu cuenta seguira activa hasta el final del periodo facturado.",
  },
  {
    question: "¿Los precios incluyen IVA?",
    answer:
      "Los precios mostrados no incluyen IVA. El IVA aplicable (21%) se anadira en la factura.",
  },
  {
    question: "¿Que es el Kit Digital?",
    answer:
      "El Kit Digital es un programa de ayudas del Gobierno de Espana para la digitalizacion de pymes y autonomos. YaComanda es elegible como solucion de comercio electronico, lo que significa que podrias financiar hasta el 100% del coste con esta subvencion.",
  },
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Si. Puedes subir o bajar de plan cuando quieras. Si subes, se te cobrara la diferencia prorrateada. Si bajas, el cambio se aplica en el siguiente ciclo de facturacion.",
  },
  {
    question: "¿Que pasa si supero el limite de pedidos?",
    answer:
      "Te avisaremos cuando estes cerca del limite. Si lo superas, tus pedidos seguiran funcionando pero te recomendaremos subir de plan. Nunca cortamos el servicio sin aviso.",
  },
];

export function PricingFaq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {pricingFaqs.map((faq, i) => (
        <AccordionItem key={i} value={`pricing-faq-${i}`}>
          <AccordionTrigger className="text-base">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
