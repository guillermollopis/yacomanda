"use client";

import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Upload, Loader2, Trash2, Plus, Check } from "lucide-react";

interface ExtractedItem {
  name: string;
  price: string;
  category?: string;
  description?: string;
}

/**
 * Resize + compress an image file to JPEG under ~3MB for Groq vision API (4MB base64 limit).
 * Returns base64 string (without data: prefix).
 */
function compressImage(file: File, maxDim = 2000, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      // Strip "data:image/jpeg;base64,"
      const base64 = dataUrl.split(",")[1];
      resolve(base64);
    };
    img.onerror = () => reject(new Error("No se pudo cargar la imagen"));
    img.src = URL.createObjectURL(file);
  });
}

interface MenuImportProps {
  onImport: (items: ExtractedItem[]) => void;
}

export function MenuImport({ onImport }: MenuImportProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [extractedItems, setExtractedItems] = useState<ExtractedItem[] | null>(
    null
  );
  const [preview, setPreview] = useState<string | null>(null);

  const importMutation = trpc.catalog.importFromImage.useMutation({
    onSuccess: (data) => {
      setExtractedItems(data.items);
      toast.success(`${data.items.length} productos detectados`);
    },
    onError: (err) => toast.error(err.message),
  });

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se aceptan imágenes (JPG, PNG)");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("La imagen es demasiado grande (máximo 20MB)");
      return;
    }

    // Show preview
    setPreview(URL.createObjectURL(file));
    setExtractedItems(null);

    try {
      const base64 = await compressImage(file);
      importMutation.mutate({ image: base64, mimeType: "image/jpeg" });
    } catch {
      toast.error("Error al procesar la imagen");
    }
  }

  function updateItem(
    idx: number,
    field: keyof ExtractedItem,
    value: string
  ) {
    setExtractedItems((prev) => {
      if (!prev) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  }

  function removeItem(idx: number) {
    setExtractedItems((prev) => prev?.filter((_, i) => i !== idx) ?? null);
  }

  function addEmptyItem() {
    setExtractedItems((prev) => [
      ...(prev ?? []),
      { name: "", price: "0.00", category: "General" },
    ]);
  }

  // Initial upload state
  if (!extractedItems && !importMutation.isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="size-5" />
            Importar carta desde foto
          </CardTitle>
          <CardDescription>
            Sube una foto de tu carta y la IA extraerá los productos
            automáticamente. Podrás revisar y editar antes de guardar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="mr-2 size-4" />
              Subir foto de la carta
            </Button>
          </div>
          {preview && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview de la carta"
                className="max-h-48 rounded-lg border object-contain"
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (importMutation.isPending) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Analizando tu carta con IA...
          </p>
          {preview && (
            <div className="mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="max-h-32 rounded-lg border object-contain opacity-50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Review + edit state
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revisa los productos detectados</CardTitle>
        <CardDescription>
          La IA ha extraído {extractedItems?.length ?? 0} productos. Edita lo
          que necesites y confirma.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {extractedItems?.map((item, idx) => (
          <div key={idx} className="flex items-end gap-2">
            <div className="flex-1 space-y-1">
              {idx === 0 && <Label className="text-xs">Nombre</Label>}
              <Input
                value={item.name}
                onChange={(e) => updateItem(idx, "name", e.target.value)}
                placeholder="Nombre del producto"
              />
            </div>
            <div className="w-20 space-y-1">
              {idx === 0 && <Label className="text-xs">Precio</Label>}
              <Input
                value={item.price}
                onChange={(e) => updateItem(idx, "price", e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="hidden w-28 space-y-1 sm:block">
              {idx === 0 && <Label className="text-xs">Categoría</Label>}
              <Input
                value={item.category ?? ""}
                onChange={(e) => updateItem(idx, "category", e.target.value)}
                placeholder="General"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => removeItem(idx)}
            >
              <Trash2 className="size-4 text-muted-foreground" />
            </Button>
          </div>
        ))}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={addEmptyItem}>
            <Plus className="mr-1 size-3" />
            Añadir producto
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setExtractedItems(null);
              setPreview(null);
            }}
          >
            <Camera className="mr-1 size-3" />
            Otra foto
          </Button>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => {
              const valid = extractedItems?.filter(
                (i) => i.name.trim() && i.price.trim()
              );
              if (!valid?.length) {
                toast.error("Añade al menos un producto con nombre y precio");
                return;
              }
              onImport(valid);
            }}
          >
            <Check className="mr-2 size-4" />
            Importar {extractedItems?.filter((i) => i.name.trim()).length ?? 0}{" "}
            productos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
