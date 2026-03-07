"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, Clock, Truck, Plus, Trash2 } from "lucide-react";

const DAY_KEYS = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
] as const;

const DAY_LABELS: Record<string, string> = {
  monday: "Lunes", tuesday: "Martes", wednesday: "Miércoles",
  thursday: "Jueves", friday: "Viernes", saturday: "Sábado", sunday: "Domingo",
};

type TimeRange = { open: string; close: string };
type WeekSchedule = Record<string, TimeRange[]>;

export default function SettingsPage() {
  const { data, isLoading } = trpc.settings.getBusinessSettings.useQuery();
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    minPreparationMinutes: 30,
    deliveryEnabled: false,
    pickupEnabled: true,
  });

  const [schedule, setSchedule] = useState<WeekSchedule>({});
  const [closedDays, setClosedDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name ?? "",
        phone: data.phone ?? "",
        email: data.email ?? "",
        address: data.address ?? "",
        city: data.city ?? "",
        postalCode: data.postalCode ?? "",
        minPreparationMinutes: data.minPreparationMinutes ?? 30,
        deliveryEnabled: data.deliveryEnabled ?? false,
        pickupEnabled: data.pickupEnabled ?? true,
      });

      const raw = (data.kitchenSchedule ?? {}) as Record<string, TimeRange | TimeRange[]>;
      const normalized: WeekSchedule = {};
      for (const [day, val] of Object.entries(raw)) {
        normalized[day] = Array.isArray(val) ? val : [val];
      }
      setSchedule(normalized);

      const closed: Record<string, boolean> = {};
      for (const day of DAY_KEYS) {
        closed[day] = !normalized[day];
      }
      setClosedDays(closed);
    }
  }, [data]);

  const updateMutation = trpc.settings.updateBusinessSettings.useMutation({
    onSuccess: () => {
      toast.success("Ajustes guardados");
      utils.settings.getBusinessSettings.invalidate();
      utils.settings.getBusinessHeader.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSave() {
    const finalSchedule: WeekSchedule = {};
    for (const day of DAY_KEYS) {
      if (!closedDays[day] && schedule[day]?.length) {
        finalSchedule[day] = schedule[day];
      }
    }

    updateMutation.mutate({
      name: form.name || undefined,
      phone: form.phone || undefined,
      email: form.email || undefined,
      address: form.address || undefined,
      city: form.city || undefined,
      postalCode: form.postalCode || undefined,
      minPreparationMinutes: form.minPreparationMinutes,
      deliveryEnabled: form.deliveryEnabled,
      pickupEnabled: form.pickupEnabled,
      kitchenSchedule: finalSchedule,
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Business info */}
      <Card>
        <CardHeader>
          <CardTitle>Información del negocio</CardTitle>
          <CardDescription>
            Datos básicos que se muestran a tus clientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del negocio</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Código postal</Label>
              <Input
                id="postalCode"
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="size-5" />
            <div>
              <CardTitle>Horario</CardTitle>
              <CardDescription>
                Fuera de este horario, el bot avisará que estáis cerrados.
                Puedes añadir varios turnos por día (ej: comidas y cenas).
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.values(closedDays).every(Boolean) && (
            <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
              Todos los días están cerrados. El bot informará a los clientes de que estáis cerrados. Activa los días que abres.
            </div>
          )}
          {DAY_KEYS.map((day) => {
            const ranges = schedule[day] ?? [{ open: "09:00", close: "22:00" }];
            return (
              <div
                key={day}
                className="rounded-md border p-3 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-24 shrink-0">
                    <span className="text-sm font-medium">{DAY_LABELS[day]}</span>
                  </div>
                  <Switch
                    checked={!closedDays[day]}
                    onCheckedChange={(checked) => {
                      setClosedDays({ ...closedDays, [day]: !checked });
                      if (checked && (!schedule[day] || schedule[day].length === 0)) {
                        setSchedule({
                          ...schedule,
                          [day]: [{ open: "09:00", close: "22:00" }],
                        });
                      }
                    }}
                  />
                  {closedDays[day] && (
                    <span className="text-sm text-muted-foreground">Cerrado</span>
                  )}
                </div>
                {!closedDays[day] && (
                  <div className="ml-[calc(6rem+0.75rem)] space-y-1.5">
                    {ranges.map((range, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={range.open}
                          onChange={(e) => {
                            const updated = [...ranges];
                            updated[idx] = { ...updated[idx], open: e.target.value };
                            setSchedule({ ...schedule, [day]: updated });
                          }}
                          className="w-28"
                        />
                        <span className="text-sm text-muted-foreground">a</span>
                        <Input
                          type="time"
                          value={range.close}
                          onChange={(e) => {
                            const updated = [...ranges];
                            updated[idx] = { ...updated[idx], close: e.target.value };
                            setSchedule({ ...schedule, [day]: updated });
                          }}
                          className="w-28"
                        />
                        {ranges.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0"
                            onClick={() => {
                              const updated = ranges.filter((_, i) => i !== idx);
                              setSchedule({ ...schedule, [day]: updated });
                            }}
                          >
                            <Trash2 className="size-3.5 text-muted-foreground" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground"
                      onClick={() => {
                        setSchedule({
                          ...schedule,
                          [day]: [...ranges, { open: "20:00", close: "00:00" }],
                        });
                      }}
                    >
                      <Plus className="mr-1 size-3" />
                      Añadir turno
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Order configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Truck className="size-5" />
            <div>
              <CardTitle>Pedidos</CardTitle>
              <CardDescription>
                Tiempos y tipos de entrega.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="prepTime">
              Tiempo mínimo de preparación (minutos)
            </Label>
            <Input
              id="prepTime"
              type="number"
              min={0}
              max={240}
              value={form.minPreparationMinutes}
              onChange={(e) =>
                setForm({
                  ...form,
                  minPreparationMinutes: parseInt(e.target.value) || 0,
                })
              }
              className="w-32"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Recogida en local</Label>
              <p className="text-xs text-muted-foreground">
                Permitir pedidos para recoger.
              </p>
            </div>
            <Switch
              checked={form.pickupEnabled}
              onCheckedChange={(checked) =>
                setForm({ ...form, pickupEnabled: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Entrega a domicilio</Label>
              <p className="text-xs text-muted-foreground">
                Permitir pedidos con entrega.
              </p>
            </div>
            <Switch
              checked={form.deliveryEnabled}
              onCheckedChange={(checked) =>
                setForm({ ...form, deliveryEnabled: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={updateMutation.isPending}>
          <Save className="mr-2 size-4" />
          {updateMutation.isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}
