import { XCircle } from "lucide-react";

export default async function PaymentCancelledPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <XCircle className="mb-4 size-16 text-muted-foreground" />
      <h1 className="text-2xl font-bold">Pago cancelado</h1>
      {order && (
        <p className="mt-2 text-muted-foreground">
          Pedido #{order}
        </p>
      )}
      <p className="mt-4 text-sm text-muted-foreground">
        El pago no se ha completado. Si quieres intentarlo de nuevo, usa el
        enlace de pago en WhatsApp.
      </p>
    </div>
  );
}
