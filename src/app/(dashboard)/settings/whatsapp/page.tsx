"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BOT_TONES } from "@/config/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, CheckCircle2, Bot, Truck, Clock } from "lucide-react";

const TONE_LABELS: Record<string, string> = {
  formal: "Formal (usted)",
  informal: "Informal (tú)",
  muy_informal: "Muy informal (coloquial)",
};

const DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DAY_LABELS: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

type DaySchedule = { open: string; close: string };
type WeekSchedule = Record<string, DaySchedule>;

export default function WhatsAppSettingsPage() {
  const { data, isLoading } = trpc.settings.getBusinessSettings.useQuery();
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    botActive: false,
    botTone: "informal" as string,
    welcomeMessage: "",
    minPreparationMinutes: 30,
    deliveryEnabled: false,
    pickupEnabled: true,
  });

  const [schedule, setSchedule] = useState<WeekSchedule>({});
  const [closedDays, setClosedDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (data) {
      setForm({
        botActive: data.botActive ?? false,
        botTone: data.botTone ?? "informal",
        welcomeMessage: data.welcomeMessage ?? "",
        minPreparationMinutes: data.minPreparationMinutes ?? 30,
        deliveryEnabled: data.deliveryEnabled ?? false,
        pickupEnabled: data.pickupEnabled ?? true,
      });

      const savedSchedule = (data.kitchenSchedule ?? {}) as WeekSchedule;
      setSchedule(savedSchedule);

      // Compute closed days
      const closed: Record<string, boolean> = {};
      for (const day of DAY_KEYS) {
        closed[day] = !savedSchedule[day];
      }
      setClosedDays(closed);
    }
  }, [data]);

  const updateMutation = trpc.settings.updateBusinessSettings.useMutation({
    onSuccess: () => {
      toast.success("Ajustes de WhatsApp guardados");
      utils.settings.getBusinessSettings.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSave() {
    // Build final schedule excluding closed days
    const finalSchedule: WeekSchedule = {};
    for (const day of DAY_KEYS) {
      if (!closedDays[day] && schedule[day]) {
        finalSchedule[day] = schedule[day];
      }
    }

    updateMutation.mutate({
      botActive: form.botActive,
      botTone: form.botTone as (typeof BOT_TONES)[number],
      welcomeMessage: form.welcomeMessage || undefined,
      minPreparationMinutes: form.minPreparationMinutes,
      deliveryEnabled: form.deliveryEnabled,
      pickupEnabled: form.pickupEnabled,
      kitchenSchedule: finalSchedule,
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Ajustes de WhatsApp</h1>
          <p className="text-sm text-muted-foreground">
            Configura tu integración con WhatsApp y el bot.
          </p>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-lg" />
        ))}
      </div>
    );
  }

  const waConnected = !!data?.waPhoneId;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ajustes de WhatsApp</h1>
        <p className="text-sm text-muted-foreground">
          Configura tu integración con WhatsApp y el bot.
        </p>
      </div>

      {/* Connection status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Estado de conexión</CardTitle>
        </CardHeader>
        <CardContent>
          {waConnected ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                WhatsApp conectado
              </span>
              <Badge variant="secondary" className="ml-2">
                {data?.phone}
              </Badge>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-sm font-medium text-yellow-700">
                  Configuración pendiente
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Nuestro equipo está configurando WhatsApp Business para tu
                número{data?.phone ? ` (${data.phone})` : ""}. Este proceso
                suele tardar 24-48h desde que completaste el registro.
              </p>
              <p className="text-sm text-muted-foreground">
                ¿Necesitas ayuda? Escríbenos a{" "}
                <a
                  href="mailto:soporte@yacomanda.com"
                  className="text-primary underline"
                >
                  soporte@yacomanda.com
                </a>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bot configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="size-5" />
            <div>
              <CardTitle>Configuración del bot</CardTitle>
              <CardDescription>
                Controla cómo responde el bot a los mensajes.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Bot activo</Label>
              <p className="text-xs text-muted-foreground">
                Si está desactivado, los mensajes no se responderán automáticamente.
              </p>
            </div>
            <Switch
              checked={form.botActive}
              onCheckedChange={(checked) =>
                setForm({ ...form, botActive: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Tono del bot</Label>
            <Select
              value={form.botTone}
              onValueChange={(v) => setForm({ ...form, botTone: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BOT_TONES.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {TONE_LABELS[tone] ?? tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Mensaje de bienvenida</Label>
            <Textarea
              value={form.welcomeMessage}
              onChange={(e) =>
                setForm({ ...form, welcomeMessage: e.target.value })
              }
              placeholder="¡Hola! Bienvenido a nuestro restaurante..."
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {form.welcomeMessage.length}/500 caracteres
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Business hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="size-5" />
            <div>
              <CardTitle>Horario de cocina</CardTitle>
              <CardDescription>
                Fuera de este horario, el bot informará que estáis cerrados. Deja
                todos los días sin horario para aceptar pedidos 24/7.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {DAY_KEYS.map((day) => (
            <div
              key={day}
              className="flex items-center gap-3 rounded-md border p-3"
            >
              <div className="w-24 shrink-0">
                <span className="text-sm font-medium">{DAY_LABELS[day]}</span>
              </div>
              <Switch
                checked={!closedDays[day]}
                onCheckedChange={(checked) => {
                  setClosedDays({ ...closedDays, [day]: !checked });
                  if (checked && !schedule[day]) {
                    setSchedule({
                      ...schedule,
                      [day]: { open: "09:00", close: "22:00" },
                    });
                  }
                }}
              />
              {closedDays[day] ? (
                <span className="text-sm text-muted-foreground">Cerrado</span>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={schedule[day]?.open ?? "09:00"}
                    onChange={(e) =>
                      setSchedule({
                        ...schedule,
                        [day]: {
                          ...schedule[day],
                          open: e.target.value,
                          close: schedule[day]?.close ?? "22:00",
                        },
                      })
                    }
                    className="w-28"
                  />
                  <span className="text-sm text-muted-foreground">a</span>
                  <Input
                    type="time"
                    value={schedule[day]?.close ?? "22:00"}
                    onChange={(e) =>
                      setSchedule({
                        ...schedule,
                        [day]: {
                          open: schedule[day]?.open ?? "09:00",
                          close: e.target.value,
                        },
                      })
                    }
                    className="w-28"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Truck className="size-5" />
            <div>
              <CardTitle>Configuración de pedidos</CardTitle>
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
