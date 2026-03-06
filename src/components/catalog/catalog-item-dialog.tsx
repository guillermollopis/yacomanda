"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALLERGENS, DEFAULT_CATEGORIES } from "@/config/constants";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import type { CatalogItem } from "@/components/catalog/catalog-table";

type Allergen = (typeof ALLERGENS)[number];

const CUSTOM_VALUE = "__custom__";

export function CatalogItemDialog({
  open,
  onOpenChange,
  item,
  existingCategories,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: CatalogItem | null;
  existingCategories?: string[];
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState(false);
  const [allergens, setAllergens] = useState<Allergen[]>([]);

  // Merge default categories with existing ones from the business
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    DEFAULT_CATEGORIES.forEach((c) => set.add(c));
    existingCategories?.forEach((c) => {
      if (c) set.add(c.charAt(0).toUpperCase() + c.slice(1));
    });
    return [...set].sort((a, b) => a.localeCompare(b, "es"));
  }, [existingCategories]);

  const utils = trpc.useUtils();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description ?? "");
      setPrice(item.price);
      const cat = item.category ?? "";
      setCategory(cat);
      // If the category isn't in the list, show custom input
      const normalized = cat.charAt(0).toUpperCase() + cat.slice(1);
      setCustomCategory(
        cat !== "" && !allCategories.includes(normalized)
      );
      setAllergens((item.allergens ?? []) as Allergen[]);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setCustomCategory(false);
      setAllergens([]);
    }
  }, [item, open, allCategories]);

  const createMutation = trpc.catalog.create.useMutation({
    onSuccess: () => {
      toast.success("Producto creado");
      utils.catalog.list.invalidate();
      onOpenChange(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.catalog.update.useMutation({
    onSuccess: () => {
      toast.success("Producto actualizado");
      utils.catalog.list.invalidate();
      onOpenChange(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Normalize: capitalize first letter
    const normalizedCategory = category
      ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      : undefined;

    const data = {
      name,
      description: description || undefined,
      price,
      category: normalizedCategory,
      allergens,
    };

    if (item) {
      updateMutation.mutate({ id: item.id, data });
    } else {
      createMutation.mutate(data);
    }
  }

  function toggleAllergen(allergen: Allergen) {
    setAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  }

  function handleCategoryChange(value: string) {
    if (value === CUSTOM_VALUE) {
      setCustomCategory(true);
      setCategory("");
    } else {
      setCustomCategory(false);
      setCategory(value);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {item ? "Editar producto" : "Nuevo producto"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio (€) *</Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              {customCategory ? (
                <div className="flex gap-1">
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Nombre de la categoría"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-xs"
                    onClick={() => {
                      setCustomCategory(false);
                      setCategory("");
                    }}
                  >
                    Lista
                  </Button>
                </div>
              ) : (
                <Select
                  value={category || undefined}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                    <SelectItem value={CUSTOM_VALUE}>
                      + Nueva categoría...
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Alérgenos</Label>
            <div className="flex flex-wrap gap-2">
              {ALLERGENS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAllergen(a)}
                  className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                    allergens.includes(a)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : item ? "Guardar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
