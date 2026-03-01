import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos de Servicio",
  description:
    "Terminos y condiciones de uso de YaComanda, un producto de PROTFORGE SL.",
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-28">
      <h1 className="text-4xl font-bold">Terminos de Servicio</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ultima actualizacion: 28 de febrero de 2026
      </p>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-medium [&_p]:mt-3 [&_p]:leading-7 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
        <h2>1. Identificacion del prestador</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Informacion y de Comercio Electronico (LSSI-CE), se
          informa que el presente sitio web y la plataforma YaComanda (en
          adelante, &ldquo;el Servicio&rdquo;) son titularidad de:
        </p>
        <ul>
          <li>
            <strong>Denominacion social:</strong> PROTFORGE SL
          </li>
          <li>
            <strong>CIF:</strong> B75512434
          </li>
          <li>
            <strong>Domicilio social:</strong> Avenida de Aragon 29, puerta 5,
            46010 Valencia, Espana
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:guillermollopis@protforge.com"
              className="text-primary underline"
            >
              guillermollopis@protforge.com
            </a>
          </li>
          <li>
            <strong>Telefono:</strong>{" "}
            <a href="tel:+34636873210" className="text-primary underline">
              +34 636 873 210
            </a>
          </li>
          <li>
            <strong>Registro Mercantil:</strong> Inscrita en el Registro
            Mercantil de Valencia
          </li>
        </ul>

        <h2>2. Objeto y ambito de aplicacion</h2>
        <p>
          Estos terminos regulan el acceso y uso de la plataforma YaComanda, un
          servicio de automatizacion de pedidos por WhatsApp con inteligencia
          artificial destinado a negocios de hosteleria y restauracion.
        </p>
        <p>
          El uso del Servicio implica la aceptacion integra de estos terminos.
          Si no esta de acuerdo, no utilice el Servicio.
        </p>

        <h2>3. Descripcion del Servicio</h2>
        <p>YaComanda proporciona a los negocios:</p>
        <ul>
          <li>Recepcion automatizada de pedidos a traves de WhatsApp Business API</li>
          <li>Interpretacion de pedidos mediante inteligencia artificial</li>
          <li>Panel de gestion de pedidos, carta/menu y clientes</li>
          <li>Integracion con pasarela de pagos (Stripe)</li>
        </ul>

        <h2>4. Planes y precios</h2>
        <p>El Servicio ofrece los siguientes planes de suscripcion:</p>
        <ul>
          <li>
            <strong>Esencial:</strong> 29&euro;/mes — hasta 500 pedidos/mes
          </li>
          <li>
            <strong>Profesional:</strong> 79&euro;/mes — hasta 2.000 pedidos/mes
          </li>
          <li>
            <strong>Negocio:</strong> 199&euro;/mes — pedidos ilimitados
          </li>
        </ul>
        <p>
          Los precios indicados no incluyen IVA. PROTFORGE SL se reserva el
          derecho de modificar los precios, notificando a los usuarios con al
          menos 30 dias de antelacion.
        </p>

        <h2>5. Registro y cuenta</h2>
        <p>
          Para utilizar el Servicio, debera crear una cuenta proporcionando
          informacion veraz y actualizada. Usted es responsable de mantener la
          confidencialidad de sus credenciales de acceso y de todas las
          actividades que se realicen bajo su cuenta.
        </p>

        <h2>6. Uso aceptable</h2>
        <p>El usuario se compromete a:</p>
        <ul>
          <li>Utilizar el Servicio conforme a la ley, la moral y el orden publico</li>
          <li>No enviar mensajes de spam o contenido no solicitado a traves del bot</li>
          <li>No utilizar el Servicio para actividades ilegales o fraudulentas</li>
          <li>Cumplir con las politicas de uso de WhatsApp Business</li>
          <li>No intentar acceder a datos de otros usuarios del Servicio</li>
          <li>No realizar ingenieria inversa, descompilar o desensamblar el software</li>
        </ul>
        <p>
          El incumplimiento de estas condiciones podra dar lugar a la suspension
          o cancelacion inmediata de la cuenta.
        </p>

        <h2>7. Propiedad intelectual e industrial</h2>
        <p>
          Todos los derechos de propiedad intelectual e industrial sobre el
          Servicio, incluyendo pero no limitado a su codigo fuente, diseno,
          logotipos, textos y graficos, pertenecen a PROTFORGE SL o a sus
          licenciantes.
        </p>
        <p>
          El usuario conserva todos los derechos sobre los datos y contenidos que
          introduzca en la plataforma (carta, pedidos, informacion de clientes).
        </p>

        <h2>8. Proteccion de datos</h2>
        <p>
          El tratamiento de datos personales se rige por nuestra{" "}
          <a href="/privacidad" className="text-primary underline">
            Politica de Privacidad
          </a>
          , que forma parte integrante de estos terminos.
        </p>

        <h2>9. Disponibilidad y soporte</h2>
        <p>
          PROTFORGE SL se esfuerza por mantener el Servicio disponible de forma
          continuada, pero no garantiza una disponibilidad del 100%. Se podran
          realizar interrupciones programadas para mantenimiento, que seran
          comunicadas con la mayor antelacion posible.
        </p>

        <h2>10. Limitacion de responsabilidad</h2>
        <ul>
          <li>
            PROTFORGE SL no sera responsable de los danos indirectos,
            incidentales, especiales o consecuenciales derivados del uso del
            Servicio.
          </li>
          <li>
            La responsabilidad total de PROTFORGE SL no excedera el importe
            pagado por el usuario en los 12 meses anteriores al evento que
            genere la reclamacion.
          </li>
          <li>
            PROTFORGE SL no es responsable de las decisiones comerciales tomadas
            por los negocios basandose en la informacion proporcionada por el
            Servicio.
          </li>
          <li>
            PROTFORGE SL no garantiza la precision del procesamiento de lenguaje
            natural, y los negocios deben verificar los pedidos interpretados por
            la IA.
          </li>
        </ul>

        <h2>11. Duracion y terminacion</h2>
        <p>
          El contrato tiene una duracion indefinida mientras la suscripcion este
          activa. Cualquiera de las partes puede resolver el contrato:
        </p>
        <ul>
          <li>
            El usuario puede cancelar su suscripcion en cualquier momento desde
            el panel de control, siendo efectiva al final del periodo facturado.
          </li>
          <li>
            PROTFORGE SL puede suspender o cancelar una cuenta por
            incumplimiento de estos terminos, previo aviso de 15 dias salvo
            causa grave.
          </li>
        </ul>
        <p>
          Tras la terminacion, los datos del usuario se conservaran durante 30
          dias y posteriormente seran eliminados, salvo obligacion legal de
          conservacion.
        </p>

        <h2>12. Modificaciones</h2>
        <p>
          PROTFORGE SL se reserva el derecho de modificar estos terminos. Los
          cambios sustanciales seran notificados con al menos 30 dias de
          antelacion por correo electronico o a traves del panel de control. El
          uso continuado del Servicio tras dicho plazo implica la aceptacion de
          los nuevos terminos.
        </p>

        <h2>13. Legislacion aplicable y jurisdiccion</h2>
        <p>
          Estos terminos se rigen por la legislacion espanola. Para la
          resolucion de cualquier controversia derivada de estos terminos, ambas
          partes se someten a los Juzgados y Tribunales de la ciudad de
          Valencia, con renuncia expresa a cualquier otro fuero que pudiera
          corresponderles.
        </p>

        <h2>14. Contacto</h2>
        <p>
          Para cualquier consulta relacionada con estos terminos, puede
          contactarnos en:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:guillermollopis@protforge.com"
              className="text-primary underline"
            >
              guillermollopis@protforge.com
            </a>
          </li>
          <li>
            <strong>Telefono:</strong>{" "}
            <a href="tel:+34636873210" className="text-primary underline">
              +34 636 873 210
            </a>
          </li>
          <li>
            <strong>Direccion:</strong> Avenida de Aragon 29, puerta 5, 46010
            Valencia, Espana
          </li>
        </ul>
      </div>
    </div>
  );
}
