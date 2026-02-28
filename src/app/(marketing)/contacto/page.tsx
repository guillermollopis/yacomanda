import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con PROTFORGE SL, la empresa detras de YaComanda.",
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
        {/* Contacto directo */}
        <Card>
          <CardHeader>
            <CardTitle>Contacto directo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <a
                href="mailto:guillermollopis@protforge.com"
                className="text-primary underline"
              >
                guillermollopis@protforge.com
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
          </CardContent>
        </Card>

        {/* Datos de la empresa */}
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
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Registro Mercantil
              </p>
              <p>Inscrita en el Registro Mercantil de Valencia</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
