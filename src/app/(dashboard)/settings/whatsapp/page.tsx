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
import { Save, CheckCircle2, Bot, Truck, Clock, BellRing, Wallet, Plus, Trash2 } from "lucide-react";
import { EmbeddedSignup } from "@/components/whatsapp/embedded-signup";

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

type TimeRange = { open: string; close: string };
type WeekSchedule = Record<string, TimeRange[]>;

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
    notificationPhone: "",
    bizumPhone: "",
  });

  const [schedule, setSchedule] = useState<WeekSchedule>({});
  const [closedDays, setClosedDays] = useState<Record<string, boolean>>({});
  const [showReconnect, setShowReconnect] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        botActive: data.botActive ?? false,
        botTone: data.botTone ?? "informal",
        welcomeMessage: data.welcomeMessage ?? "",
        minPreparationMinutes: data.minPreparationMinutes ?? 30,
        deliveryEnabled: data.deliveryEnabled ?? false,
        pickupEnabled: data.pickupEnabled ?? true,
        notificationPhone: data.notificationPhone ?? "",
        bizumPhone: data.bizumPhone ?? "",
      });

      const raw = (data.kitchenSchedule ?? {}) as Record<string, TimeRange | TimeRange[]>;
      // Normalize legacy single-range format to arrays
      const normalized: WeekSchedule = {};
      for (const [day, val] of Object.entries(raw)) {
        normalized[day] = Array.isArray(val) ? val : [val];
      }
      setSchedule(normalized);

      // Compute closed days
      const closed: Record<string, boolean> = {};
      for (const day of DAY_KEYS) {
        closed[day] = !normalized[day];
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
      if (!closedDays[day] && schedule[day]?.length) {
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
      notificationPhone: form.notificationPhone || undefined,
      bizumPhone: form.bizumPhone || undefined,
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

  const waConnected = !!data?.waPhoneId;

  return (
    <div className="space-y-6">

      {/* Connection status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Estado de conexión</CardTitle>
        </CardHeader>
        <CardContent>
          {waConnected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  WhatsApp conectado
                </span>
                <Badge variant="secondary" className="ml-2">
                  {data?.phone}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReconnect((v) => !v)}
              >
                Reconectar
              </Button>
              {showReconnect && (
                <div className="pt-2">
                  <EmbeddedSignup
                    onConnected={() => {
                      setShowReconnect(false);
                      utils.settings.getBusinessSettings.invalidate();
                      toast.success("WhatsApp reconectado");
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Conecta tu número de WhatsApp Business para empezar a recibir
                pedidos.
              </p>
              <EmbeddedSignup
                onConnected={() => {
                  utils.settings.getBusinessSettings.invalidate();
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Owner notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BellRing className="size-5" />
            <div>
              <CardTitle>Notificaciones al propietario</CardTitle>
              <CardDescription>
                Recibe los pedidos nuevos en tu WhatsApp personal con botones
                para aceptar, preparar y marcar como listo.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="notificationPhone">
              Número de WhatsApp para notificaciones
            </Label>
            <Input
              id="notificationPhone"
              value={form.notificationPhone}
              onChange={(e) =>
                setForm({ ...form, notificationPhone: e.target.value })
              }
              placeholder="+34 600 123 456"
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground">
              Debe ser un número diferente al de tu negocio. Usa tu número
              personal con prefijo del país (ej: +34).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bizum */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wallet className="size-5" />
            <div>
              <CardTitle>Bizum</CardTitle>
              <CardDescription>
                Permite a tus clientes pagar por Bizum sin comisiones. El bot
                enviará tu número de Bizum junto con el resumen del pedido.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="bizumPhone">Número de Bizum</Label>
            <Input
              id="bizumPhone"
              value={form.bizumPhone}
              onChange={(e) =>
                setForm({ ...form, bizumPhone: e.target.value })
              }
              placeholder="+34 600 123 456"
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground">
              Deja vacío si no quieres ofrecer Bizum como método de pago.
            </p>
          </div>
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
                Fuera de este horario, el bot avisará que estáis cerrados pero
                seguirá aceptando pedidos para cuando abráis. Activa los días
                que tu negocio está abierto.
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
