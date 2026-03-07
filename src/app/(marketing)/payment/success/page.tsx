import { CheckCircle2 } from "lucide-react";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <CheckCircle2 className="mb-4 size-16 text-green-600" />
      <h1 className="text-2xl font-bold">Pago completado</h1>
      {order && (
        <p className="mt-2 text-muted-foreground">
          Pedido #{order}
        </p>
      )}
      <p className="mt-4 text-sm text-muted-foreground">
        Tu pago se ha procesado correctamente. Puedes cerrar esta ventana y
        volver a WhatsApp.
      </p>
    </div>
  );
}
