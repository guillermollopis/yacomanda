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
import { Save, CheckCircle2, Bot, BellRing } from "lucide-react";
import { EmbeddedSignup } from "@/components/whatsapp/embedded-signup";

const TONE_LABELS: Record<string, string> = {
  formal: "Formal (usted)",
  informal: "Informal (tú)",
  muy_informal: "Muy informal (coloquial)",
};

export default function WhatsAppSettingsPage() {
  const { data, isLoading } = trpc.settings.getBusinessSettings.useQuery();
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    botActive: false,
    botTone: "informal" as string,
    welcomeMessage: "",
    notificationPhone: "",
  });

  const [showReconnect, setShowReconnect] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        botActive: data.botActive ?? false,
        botTone: data.botTone ?? "informal",
        welcomeMessage: data.welcomeMessage ?? "",
        notificationPhone: data.notificationPhone ?? "",
      });
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
    updateMutation.mutate({
      botActive: form.botActive,
      botTone: form.botTone as (typeof BOT_TONES)[number],
      welcomeMessage: form.welcomeMessage || undefined,
      notificationPhone: form.notificationPhone || undefined,
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

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={updateMutation.isPending}>
          <Save className="mr-2 size-4" />
          {updateMutation.isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}
