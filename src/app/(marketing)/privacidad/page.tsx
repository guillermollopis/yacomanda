import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Privacidad",
  description:
    "Politica de privacidad de YaComanda, un producto de PROTFORGE SL.",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-28">
      <h1 className="text-4xl font-bold">Politica de Privacidad</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ultima actualizacion: 28 de febrero de 2026
      </p>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-medium [&_p]:mt-3 [&_p]:leading-7 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
        <h2>1. Responsable del tratamiento</h2>
        <p>
          <strong>PROTFORGE SL</strong> (en adelante, &ldquo;la
          Empresa&rdquo;), con CIF B75512434 y domicilio social en Avenida de
          Aragon 29, puerta 5, 46010 Valencia, Espana, es la responsable del
          tratamiento de los datos personales recogidos a traves de la plataforma
          YaComanda (en adelante, &ldquo;el Servicio&rdquo;).
        </p>
        <p>
          Contacto del delegado de proteccion de datos:{" "}
          <a
            href="mailto:guillermollopis@protforge.com"
            className="text-primary underline"
          >
            guillermollopis@protforge.com
          </a>
        </p>

        <h2>2. Datos que recopilamos</h2>
        <h3>2.1 Datos de los usuarios del panel (restaurantes)</h3>
        <ul>
          <li>Nombre, email y datos de autenticacion (gestionados por Clerk)</li>
          <li>Datos de facturacion y pago (gestionados por Stripe)</li>
          <li>
            Datos del negocio: nombre del restaurante, telefono de WhatsApp,
            carta/menu
          </li>
        </ul>
        <h3>2.2 Datos de los clientes finales (consumidores)</h3>
        <ul>
          <li>Numero de telefono de WhatsApp</li>
          <li>
            Nombre del perfil de WhatsApp (proporcionado por Meta)
          </li>
          <li>Contenido de los mensajes enviados al bot (texto, imagenes, audio)</li>
          <li>
            Pedidos realizados y su historial
          </li>
        </ul>
        <h3>2.3 Datos tecnicos</h3>
        <ul>
          <li>Direccion IP, tipo de navegador (solo en el panel web)</li>
          <li>Registros de uso y logs del servidor</li>
        </ul>

        <h2>3. Base legal del tratamiento</h2>
        <ul>
          <li>
            <strong>Ejecucion del contrato</strong> (art. 6.1.b RGPD): el
            tratamiento es necesario para prestar el Servicio contratado.
          </li>
          <li>
            <strong>Interes legitimo</strong> (art. 6.1.f RGPD): mejora del
            servicio, prevencion de fraude y seguridad.
          </li>
          <li>
            <strong>Consentimiento</strong> (art. 6.1.a RGPD): cuando el cliente
            final inicia una conversacion por WhatsApp con el negocio.
          </li>
          <li>
            <strong>Obligacion legal</strong> (art. 6.1.c RGPD): cumplimiento
            de obligaciones fiscales y mercantiles.
          </li>
        </ul>

        <h2>4. Finalidades del tratamiento</h2>
        <ul>
          <li>Prestar el servicio de gestion de pedidos por WhatsApp</li>
          <li>Procesar pagos y facturacion</li>
          <li>Procesar mensajes mediante inteligencia artificial para interpretar pedidos</li>
          <li>Enviar comunicaciones relacionadas con el servicio</li>
          <li>Mejorar y optimizar la plataforma</li>
          <li>Cumplir con obligaciones legales</li>
        </ul>

        <h2>5. Subencargados del tratamiento</h2>
        <p>
          Compartimos datos con los siguientes proveedores, todos ellos con
          garantias adecuadas de proteccion de datos:
        </p>
        <ul>
          <li>
            <strong>Neon (Neon Inc.)</strong> — Base de datos PostgreSQL. Datos
            alojados en la UE (aws-eu-central-1).
          </li>
          <li>
            <strong>Clerk (Clerk Inc.)</strong> — Autenticacion de usuarios del
            panel. EE.UU. con clausulas contractuales tipo.
          </li>
          <li>
            <strong>Stripe (Stripe Inc.)</strong> — Procesamiento de pagos.
            Certificado PCI DSS Nivel 1. EE.UU. con clausulas contractuales
            tipo.
          </li>
          <li>
            <strong>Meta Platforms (WhatsApp Business API)</strong> — Envio y
            recepcion de mensajes de WhatsApp. Irlanda/EE.UU.
          </li>
          <li>
            <strong>Groq Inc.</strong> — Procesamiento de lenguaje natural para
            interpretar pedidos. EE.UU. con clausulas contractuales tipo.
          </li>
          <li>
            <strong>Anthropic PBC</strong> — Proveedor de IA alternativo. EE.UU.
            con clausulas contractuales tipo.
          </li>
          <li>
            <strong>OpenAI Inc.</strong> — Transcripcion de audio (Whisper) y
            proveedor de IA alternativo. EE.UU. con clausulas contractuales
            tipo.
          </li>
          <li>
            <strong>Cloudflare Inc. (R2)</strong> — Almacenamiento de archivos
            multimedia. Red global con opcion de residencia de datos en la UE.
          </li>
          <li>
            <strong>Upstash Inc.</strong> — Cache Redis y limitacion de tasa.
            Datos en la UE.
          </li>
        </ul>

        <h2>6. Transferencias internacionales</h2>
        <p>
          Algunos de nuestros subencargados estan ubicados fuera del Espacio
          Economico Europeo (EEE). En todos los casos, las transferencias se
          realizan al amparo de clausulas contractuales tipo aprobadas por la
          Comision Europea (Decision 2021/914) o decisiones de adecuacion, segun
          corresponda.
        </p>

        <h2>7. Conservacion de los datos</h2>
        <ul>
          <li>
            <strong>Datos de cuenta:</strong> mientras la cuenta este activa, y
            hasta 30 dias tras su eliminacion.
          </li>
          <li>
            <strong>Mensajes y pedidos:</strong> 24 meses desde la fecha del
            mensaje/pedido.
          </li>
          <li>
            <strong>Datos de facturacion:</strong> 5 anos conforme a la
            legislacion fiscal espanola.
          </li>
          <li>
            <strong>Logs del servidor:</strong> 90 dias.
          </li>
        </ul>

        <h2>8. Derechos de los interesados</h2>
        <p>
          Conforme al RGPD, usted tiene derecho a:
        </p>
        <ul>
          <li>
            <strong>Acceso:</strong> solicitar una copia de sus datos personales.
          </li>
          <li>
            <strong>Rectificacion:</strong> corregir datos inexactos o
            incompletos.
          </li>
          <li>
            <strong>Supresion:</strong> solicitar la eliminacion de sus datos
            (&ldquo;derecho al olvido&rdquo;).
          </li>
          <li>
            <strong>Limitacion:</strong> restringir el tratamiento en
            determinadas circunstancias.
          </li>
          <li>
            <strong>Portabilidad:</strong> recibir sus datos en un formato
            estructurado y legible por maquina.
          </li>
          <li>
            <strong>Oposicion:</strong> oponerse al tratamiento basado en
            interes legitimo.
          </li>
        </ul>
        <p>
          Para ejercer estos derechos, contacte con nosotros en{" "}
          <a
            href="mailto:guillermollopis@protforge.com"
            className="text-primary underline"
          >
            guillermollopis@protforge.com
          </a>
          . Responderemos en un plazo maximo de 30 dias.
        </p>
        <p>
          Si considera que sus derechos no han sido atendidos correctamente,
          puede presentar una reclamacion ante la Agencia Espanola de Proteccion
          de Datos (AEPD) en{" "}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            www.aepd.es
          </a>
          .
        </p>

        <h2>9. Cookies</h2>
        <p>
          El panel de gestion utiliza cookies estrictamente necesarias para el
          funcionamiento de la autenticacion (Clerk). No utilizamos cookies de
          analisis ni de publicidad. Las paginas publicas del sitio web no
          utilizan cookies.
        </p>

        <h2>10. Seguridad</h2>
        <p>
          Aplicamos medidas tecnicas y organizativas apropiadas para proteger sus
          datos, incluyendo: cifrado en transito (TLS), cifrado en reposo en
          bases de datos, control de acceso basado en roles, verificacion de
          firmas HMAC-SHA256 en webhooks, y limitacion de tasa en las API.
        </p>

        <h2>11. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de actualizar esta politica de privacidad.
          Cualquier cambio sustancial sera notificado a traves del panel de
          control o por correo electronico. La fecha de ultima actualizacion se
          indica al inicio del documento.
        </p>
      </div>
    </div>
  );
}
