import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con el equipo de YaComanda. Email, WhatsApp o formulario de contacto.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-center text-4xl font-bold">Contacto</h1>
      <p className="mt-4 text-center text-muted-foreground">
        Estamos aqui para ayudarte. Contacta con nosotros por cualquiera de
        estos medios.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Contact form */}
        <Card>
          <CardHeader>
            <CardTitle>Enviar mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Direct contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contacto directo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:hola@yacomanda.com"
                  className="text-primary underline"
                >
                  hola@yacomanda.com
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Telefono
                </p>
                <a href="tel:+34636873210" className="text-primary underline">
                  +34 636 873 210
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Horario de atencion
                </p>
                <p>Lunes a viernes, 9:00 - 18:00 (CET)</p>
              </div>
              <a
                href="https://wa.me/34636873210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="mt-2 w-full">
                  <MessageSquare className="mr-2 size-4" />
                  Escribenos por WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Company info */}
          <Card>
            <CardHeader>
              <CardTitle>Datos de la empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Razon social
                </p>
                <p className="font-semibold">PROTFORGE SL</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">CIF</p>
                <p>B75512434</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Domicilio social
                </p>
                <p>Avenida de Aragon 29, puerta 5</p>
                <p>46010 Valencia, Espana</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
