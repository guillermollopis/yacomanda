"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Puedo usar mi numero de WhatsApp actual?",
    answer:
      "Si, puedes vincular tu numero de WhatsApp Business existente. Solo necesitas acceso a la API de WhatsApp Business, y te guiamos paso a paso durante la configuracion.",
  },
  {
    question: "¿Necesito un TPV o pasarela de pago?",
    answer:
      "No. YaComanda integra cobro automatico con Bizum y tarjeta a traves de Stripe. Tus clientes pagan directamente desde el enlace que les envia el bot.",
  },
  {
    question: "¿Que pasa si la IA se equivoca en un pedido?",
    answer:
      "Si la IA no esta segura, escala la conversacion a un humano automaticamente. Ademas, siempre puedes revisar y corregir pedidos desde el panel antes de prepararlos.",
  },
  {
    question: "¿Hay periodo de prueba gratuito?",
    answer:
      "Si. Puedes empezar gratis y probar todas las funcionalidades. Solo pagas cuando decidas activar un plan.",
  },
  {
    question: "¿Cuanto se tarda en configurar todo?",
    answer:
      "La configuracion basica tarda unos 15 minutos. Subes tu carta, conectas WhatsApp y activas el bot. Listo para recibir pedidos.",
  },
];

export function FaqSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
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
