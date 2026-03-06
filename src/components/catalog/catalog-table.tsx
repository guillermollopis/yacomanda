"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

export type CatalogItem = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  category: string | null;
  variants: { name: string; price: string }[] | unknown;
  allergens: string[] | null;
  available: boolean | null;
  imageUrl: string | null;
  sortOrder: number | null;
};

export function CatalogTable({
  items,
  onEdit,
}: {
  items: CatalogItem[];
  onEdit: (item: CatalogItem) => void;
}) {
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const toggleMutation = trpc.catalog.toggleAvailable.useMutation({
    onSuccess: () => {
      utils.catalog.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.catalog.delete.useMutation({
    onSuccess: () => {
      toast.success("Producto eliminado");
      utils.catalog.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  // Group by category (case-insensitive, display first-seen casing)
  const categoryMap = new Map<string, { display: string; items: CatalogItem[] }>();
  for (const item of items) {
    const raw = item.category || "Sin categoría";
    const key = raw.toLowerCase().trim();
    const existing = categoryMap.get(key);
    if (existing) {
      existing.items.push(item);
    } else {
      // Capitalize first letter for consistent display
      const display = raw.charAt(0).toUpperCase() + raw.slice(1);
      categoryMap.set(key, { display, items: [item] });
    }
  }

  const categories = [...categoryMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "es"))
    .map(([, v]) => v);

  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        No hay productos en la carta. Crea uno para empezar.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.display}>
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {cat.display}
          </h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Alérgenos</TableHead>
                  <TableHead>Disponible</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cat.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <span className="font-medium">{item.name}</span>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.allergens?.map((a) => (
                          <Badge
                            key={a}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {a}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() =>
                          toggleMutation.mutate({
                            id: item.id,
                            available: !item.available,
                          })
                        }
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                          item.available ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                            item.available ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(item)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteItemId(item.id)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
      <AlertDialog
        open={!!deleteItemId}
        onOpenChange={(open) => !open && setDeleteItemId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto se eliminará
              permanentemente de tu carta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => {
                if (deleteItemId) deleteMutation.mutate({ id: deleteItemId });
                setDeleteItemId(null);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
