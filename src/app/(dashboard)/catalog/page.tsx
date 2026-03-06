"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Camera, AlertTriangle, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { CatalogTable, type CatalogItem } from "@/components/catalog/catalog-table";
import { CatalogItemDialog } from "@/components/catalog/catalog-item-dialog";
import { MenuImport } from "@/components/catalog/menu-import";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [showImport, setShowImport] = useState(false);

  const { data: items, isLoading, error, refetch } = trpc.catalog.list.useQuery();
  const utils = trpc.useUtils();

  const createMutation = trpc.catalog.create.useMutation({
    onSuccess: () => utils.catalog.list.invalidate(),
    onError: (err) => toast.error(err.message),
  });

  function handleEdit(item: CatalogItem) {
    setEditingItem(item);
    setDialogOpen(true);
  }

  function handleCreate() {
    setEditingItem(null);
    setDialogOpen(true);
  }

  async function handleImport(
    imported: { name: string; price: string; category?: string }[]
  ) {
    let count = 0;
    for (const item of imported) {
      try {
        await createMutation.mutateAsync({
          name: item.name,
          price: item.price,
          category: item.category,
        });
        count++;
      } catch {
        // continue with next item
      }
    }
    toast.success(`${count} productos importados`);
    setShowImport(false);
    utils.catalog.list.invalidate();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Carta</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los productos de tu carta.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowImport(!showImport)}>
            <Camera className="mr-2 size-4" />
            Importar foto
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 size-4" />
            Nuevo producto
          </Button>
        </div>
      </div>

      {showImport && (
        <MenuImport onImport={handleImport} />
      )}

      {error ? (
        <div className="rounded-lg border border-red-200 p-8 text-center">
          <AlertTriangle className="mx-auto size-8 text-red-500" />
          <p className="mt-3 font-medium text-red-700">Error al cargar la carta</p>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            <RefreshCw className="mr-2 size-4" />
            Reintentar
          </Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-md" />
          ))}
        </div>
      ) : (
        <CatalogTable items={(items ?? []) as CatalogItem[]} onEdit={handleEdit} />
      )}

      <CatalogItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editingItem}
        existingCategories={[
          ...new Set(
            (items ?? [])
              .map((i) => i.category)
              .filter((c): c is string => !!c)
          ),
        ]}
      />
    </div>
  );
}
