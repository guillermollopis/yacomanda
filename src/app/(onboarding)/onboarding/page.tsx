"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { BUSINESS_TYPES, BOT_TONES } from "@/config/constants";
import {
  Store,
  MessageSquare,
  UtensilsCrossed,
  CreditCard,
  Bot,
  Rocket,
  ArrowRight,
  ArrowLeft,
  SkipForward,
  Plus,
  Trash2,
  Check,
  PartyPopper,
  Camera,
  Download,
  Smartphone,
  Share,
  Clock,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { MenuImport } from "@/components/catalog/menu-import";
import { EmbeddedSignup } from "@/components/whatsapp/embedded-signup";

const STEPS = [
  { label: "Tu negocio", icon: Store },
  { label: "WhatsApp", icon: MessageSquare },
  { label: "Carta", icon: UtensilsCrossed },
  { label: "Pagos", icon: CreditCard },
  { label: "Bot", icon: Bot },
  { label: "Activar", icon: Rocket },
] as const;

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  restaurant: "Restaurante",
  bar: "Bar",
  cafe: "Cafetería",
  bakery: "Panadería",
};

const TONE_LABELS: Record<string, string> = {
  formal: "Formal (usted)",
  informal: "Informal (tú)",
  muy_informal: "Muy informal (coloquial)",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: status, isLoading } = trpc.onboarding.getStatus.useQuery();

  // Redirect if already completed
  useEffect(() => {
    if (status?.onboardingCompleted) {
      router.replace("/dashboard");
    }
  }, [status, router]);

  // Infer starting step from existing data
  useEffect(() => {
    if (!status || status.onboardingCompleted) return;
    if (!status.hasBusinessId) {
      setStep(0);
    } else if (!status.business?.waPhoneId) {
      setStep(1);
    } else if (!status.business?.hasCatalogItems) {
      setStep(2);
    }
    // Otherwise stay at wherever the user left off (default 0)
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (status?.onboardingCompleted) {
    return null;
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Configura tu negocio</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Paso {step + 1} de {STEPS.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`flex size-9 items-center justify-center rounded-full border-2 transition-all ${
                  i < step
                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : i === step
                      ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
                      : "border-muted text-muted-foreground"
                }`}
              >
                {i < step ? (
                  <Check className="size-4" />
                ) : (
                  <s.icon className="size-4" />
                )}
              </div>
              <span
                className={`hidden text-[10px] sm:block ${
                  i <= step
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2 h-1.5 rounded-full bg-muted">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all shadow-sm shadow-primary/20"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Confetti overlay */}
      {showConfetti && <ConfettiOverlay />}

      {/* Step content */}
      {step === 0 && (
        <Step1BasicInfo
          onNext={() => setStep(1)}
          hasBusinessId={status?.hasBusinessId ?? false}
        />
      )}
      {step === 1 && (
        <Step2WhatsApp
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
          businessPhone={status?.business?.phone}
        />
      )}
      {step === 2 && (
        <Step3Menu
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step4Payments
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <Step5BotConfig
          onNext={() => setStep(5)}
          onBack={() => setStep(3)}
          onSkip={() => setStep(5)}
        />
      )}
      {step === 5 && (
        <Step6Activate
          onBack={() => setStep(4)}
          onComplete={() => {
            setShowConfetti(true);
            setTimeout(() => router.replace("/dashboard"), 3000);
          }}
        />
      )}
    </div>
  );
}

// ==================== STEP 1: Basic Info ====================

function Step1BasicInfo({
  onNext,
  hasBusinessId,
}: {
  onNext: () => void;
  hasBusinessId: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    type: "restaurant" as string,
    city: "",
    phone: "",
    notificationPhone: "",
  });

  const utils = trpc.useUtils();

  const createMutation = trpc.onboarding.createBusiness.useMutation({
    onSuccess: () => {
      utils.onboarding.getStatus.invalidate();
      onNext();
    },
    onError: (err) => toast.error(err.message),
  });

  if (hasBusinessId) {
    // Already created — just proceed
    return (
      <Card>
        <CardHeader>
          <CardTitle>Datos básicos</CardTitle>
          <CardDescription>Tu negocio ya está creado.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <Button onClick={onNext}>
              Siguiente
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const canSubmit = form.name && form.city && form.phone;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos de tu negocio</CardTitle>
        <CardDescription>
          Empecemos con la información básica de tu restaurante.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del negocio *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ej: Bar El Rincón"
          />
        </div>

        <div className="space-y-2">
          <Label>Tipo de negocio</Label>
          <Select
            value={form.type}
            onValueChange={(v) => setForm({ ...form, type: v })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {BUSINESS_TYPE_LABELS[t] ?? t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ciudad *</Label>
          <Input
            id="city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="Ej: Barcelona"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono del negocio *</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Ej: +34 612 345 678"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notificationPhone">
            Tu número personal (notificaciones)
          </Label>
          <Input
            id="notificationPhone"
            value={form.notificationPhone}
            onChange={(e) =>
              setForm({ ...form, notificationPhone: e.target.value })
            }
            placeholder="+34 600 123 456"
          />
          <p className="text-xs text-muted-foreground">
            Recibirás los pedidos nuevos en este WhatsApp con botones para
            aceptar o rechazar. Incluye el prefijo del país (+34). Opcional.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={() =>
              createMutation.mutate({
                name: form.name,
                type: form.type as (typeof BUSINESS_TYPES)[number],
                city: form.city,
                phone: form.phone,
                notificationPhone: form.notificationPhone || undefined,
              })
            }
            disabled={!canSubmit || createMutation.isPending}
          >
            {createMutation.isPending ? "Creando..." : "Siguiente"}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== STEP 2: WhatsApp ====================

function Step2WhatsApp({
  onNext,
  onBack,
  businessPhone,
}: {
  onNext: () => void;
  onBack: () => void;
  businessPhone?: string | null;
}) {
  const [connectedPhone, setConnectedPhone] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>WhatsApp Business</CardTitle>
        <CardDescription>
          Conecta tu WhatsApp Business en un clic.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectedPhone ? (
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <Check className="size-5 text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-900">
                WhatsApp conectado
              </p>
              <p className="text-sm text-green-700">{connectedPhone}</p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Haz clic en el botón y completa el proceso en la ventana de
              Facebook. Conectarás tu cuenta de WhatsApp Business
              automáticamente.
            </p>
            <EmbeddedSignup
              onConnected={(phone) => setConnectedPhone(phone)}
            />
          </>
        )}

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 size-4" />
            Atrás
          </Button>
          <Button onClick={onNext}>
            {connectedPhone ? "Siguiente" : "Omitir por ahora"}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== STEP 3: Menu Items ====================

function Step3Menu({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<"choose" | "photo" | "manual">("choose");
  const [items, setItems] = useState<
    { name: string; price: string; category: string }[]
  >([{ name: "", price: "", category: "" }]);

  const addItemMutation = trpc.onboarding.addCatalogItem.useMutation({
    onError: (err) => toast.error(err.message),
  });

  function addRow() {
    setItems([...items, { name: "", price: "", category: "" }]);
  }

  function removeRow(idx: number) {
    setItems(items.filter((_, i) => i !== idx));
  }

  function updateRow(
    idx: number,
    field: "name" | "price" | "category",
    value: string
  ) {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    setItems(updated);
  }

  async function saveAll() {
    const valid = items.filter((item) => item.name && item.price);
    if (valid.length === 0) {
      toast.error("Añade al menos un producto");
      return;
    }

    for (const item of valid) {
      await addItemMutation.mutateAsync({
        name: item.name,
        price: item.price,
        category: item.category || undefined,
      });
    }
    toast.success(`${valid.length} producto(s) añadidos`);
    onNext();
  }

  // Choice screen: photo or manual
  if (mode === "choose") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tu carta</CardTitle>
          <CardDescription>
            ¿Como prefieres añadir tus productos?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <button
            onClick={() => setMode("photo")}
            className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-accent/50"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Camera className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Foto de la carta</p>
              <p className="text-sm text-muted-foreground">
                Sube una foto y la IA extrae los productos automaticamente
              </p>
            </div>
          </button>

          <button
            onClick={() => setMode("manual")}
            className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-accent/50"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Plus className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Añadir manualmente</p>
              <p className="text-sm text-muted-foreground">
                Escribe los productos uno a uno
              </p>
            </div>
          </button>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 size-4" />
              Atrás
            </Button>
            <Button variant="ghost" onClick={() => { toast.info("Podrás añadir productos después desde el panel"); onNext(); }}>
              <SkipForward className="mr-2 size-4" />
              Saltar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Photo import mode
  if (mode === "photo") {
    return (
      <div className="space-y-4">
        <MenuImport
          onImport={(imported) => {
            setItems(
              imported.map((i) => ({
                name: i.name,
                price: i.price,
                category: i.category ?? "",
              }))
            );
            setMode("manual");
            toast.success(`${imported.length} productos importados. Revisa y confirma.`);
          }}
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setMode("choose")}>
            <ArrowLeft className="mr-2 size-4" />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  // Manual entry mode (also used after photo import for review)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu carta</CardTitle>
        <CardDescription>
          Revisa los productos y edita lo que necesites. Podrás completar la
          carta después desde el panel.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-end gap-2">
            <div className="flex-1 space-y-1">
              {idx === 0 && (
                <Label className="text-xs">Nombre *</Label>
              )}
              <Input
                value={item.name}
                onChange={(e) => updateRow(idx, "name", e.target.value)}
                placeholder="Ej: Hamburguesa clásica"
              />
            </div>
            <div className="w-24 space-y-1">
              {idx === 0 && <Label className="text-xs">Precio *</Label>}
              <Input
                value={item.price}
                onChange={(e) => updateRow(idx, "price", e.target.value)}
                placeholder="8.50"
              />
            </div>
            <div className="w-28 space-y-1 hidden sm:block">
              {idx === 0 && (
                <Label className="text-xs">Categoría</Label>
              )}
              <Input
                value={item.category}
                onChange={(e) =>
                  updateRow(idx, "category", e.target.value)
                }
                placeholder="Platos"
              />
            </div>
            {items.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => removeRow(idx)}
              >
                <Trash2 className="size-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        ))}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addRow}>
            <Plus className="mr-1 size-3" />
            Añadir producto
          </Button>
          <Button variant="outline" size="sm" onClick={() => setMode("choose")}>
            <Camera className="mr-1 size-3" />
            Importar otra foto
          </Button>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 size-4" />
            Atrás
          </Button>
          <Button
            onClick={saveAll}
            disabled={addItemMutation.isPending}
          >
            {addItemMutation.isPending ? "Guardando..." : "Siguiente"}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== STEP 4: Payments ====================

function Step4Payments({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cobros a clientes</CardTitle>
        <CardDescription>
          Tus clientes pueden pagar con tarjeta o en efectivo al recoger.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 space-y-2">
          <p className="text-sm font-medium text-green-900">
            Efectivo — sin configurar nada
          </p>
          <p className="text-sm text-green-700">
            Por defecto, tus clientes pagan en efectivo o con tarjeta al recoger
            su pedido. No hace falta configurar nada.
          </p>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <p className="text-sm font-medium">
            Pago online con tarjeta (opcional)
          </p>
          <p className="text-sm text-muted-foreground">
            Conecta Stripe en Ajustes &gt; Pagos para que tus clientes reciban
            un enlace de pago con tarjeta junto a la confirmación del pedido.
            El pago se verifica automáticamente — sin capturas ni comprobantes.
          </p>
          <p className="text-xs text-muted-foreground">
            Comisión Stripe: ~1,5% + 0,25€ por transacción. Puedes configurarlo
            después del onboarding.
          </p>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 size-4" />
            Atrás
          </Button>
          <Button onClick={onNext}>
            Siguiente
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== STEP 5: Bot Config ====================

const DAY_KEYS = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
] as const;

const DAY_LABELS: Record<string, string> = {
  monday: "Lunes", tuesday: "Martes", wednesday: "Miércoles",
  thursday: "Jueves", friday: "Viernes", saturday: "Sábado", sunday: "Domingo",
};

type TimeRange = { open: string; close: string };
type WeekSchedule = Record<string, TimeRange[]>;

function Step5BotConfig({
  onNext,
  onBack,
  onSkip,
}: {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}) {
  const [form, setForm] = useState({
    botTone: "informal" as string,
    welcomeMessage: "",
    minPreparationMinutes: 30,
  });

  // Default schedule: Mon-Sun single range 09:00-22:00
  const [schedule, setSchedule] = useState<WeekSchedule>(() => {
    const s: WeekSchedule = {};
    for (const day of DAY_KEYS) {
      s[day] = [{ open: "09:00", close: "22:00" }];
    }
    return s;
  });
  const [closedDays, setClosedDays] = useState<Record<string, boolean>>({});

  const updateMutation = trpc.onboarding.updateBotConfig.useMutation({
    onSuccess: () => onNext(),
    onError: (err) => toast.error(err.message),
  });

  function updateRange(day: string, idx: number, field: "open" | "close", value: string) {
    const ranges = [...(schedule[day] ?? [{ open: "09:00", close: "22:00" }])];
    ranges[idx] = { ...ranges[idx], [field]: value };
    setSchedule({ ...schedule, [day]: ranges });
  }

  function addRange(day: string) {
    const ranges = [...(schedule[day] ?? [])];
    ranges.push({ open: "20:00", close: "00:00" });
    setSchedule({ ...schedule, [day]: ranges });
  }

  function removeRange(day: string, idx: number) {
    const ranges = (schedule[day] ?? []).filter((_, i) => i !== idx);
    setSchedule({ ...schedule, [day]: ranges.length > 0 ? ranges : [{ open: "09:00", close: "22:00" }] });
  }

  function handleSave() {
    const finalSchedule: WeekSchedule = {};
    for (const day of DAY_KEYS) {
      if (!closedDays[day] && schedule[day]?.length) {
        finalSchedule[day] = schedule[day];
      }
    }

    updateMutation.mutate({
      botTone: form.botTone as (typeof BOT_TONES)[number],
      welcomeMessage: form.welcomeMessage || undefined,
      minPreparationMinutes: form.minPreparationMinutes,
      kitchenSchedule: finalSchedule,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personaliza tu bot</CardTitle>
        <CardDescription>
          Configura cómo se comunicará el bot con tus clientes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
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
              {BOT_TONES.map((t) => (
                <SelectItem key={t} value={t}>
                  {TONE_LABELS[t] ?? t}
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
            placeholder="¡Hola! Bienvenido a nuestro restaurante. ¿Qué te apetece hoy?"
            rows={3}
            maxLength={500}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prepTime">
            Tiempo de preparación (minutos)
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

        {/* Kitchen schedule */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <Label>Horario de cocina</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Fuera de este horario, el bot avisará que estáis cerrados. Desactiva
            los días que no abráis. Puedes añadir varios turnos (ej: comidas y cenas).
          </p>
          {DAY_KEYS.map((day) => {
            const ranges = schedule[day] ?? [{ open: "09:00", close: "22:00" }];
            return (
              <div
                key={day}
                className="rounded-md border p-2.5 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-20 shrink-0">
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
                  <div className="ml-[calc(5rem+0.75rem)] space-y-1.5">
                    {ranges.map((range, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={range.open}
                          onChange={(e) => updateRange(day, idx, "open", e.target.value)}
                          className="w-28"
                        />
                        <span className="text-sm text-muted-foreground">a</span>
                        <Input
                          type="time"
                          value={range.close}
                          onChange={(e) => updateRange(day, idx, "close", e.target.value)}
                          className="w-28"
                        />
                        {ranges.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0"
                            onClick={() => removeRange(day, idx)}
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
                      onClick={() => addRange(day)}
                    >
                      <Plus className="mr-1 size-3" />
                      Añadir turno
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 size-4" />
            Atrás
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onSkip}>
              <SkipForward className="mr-1 size-4" />
              Omitir
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Guardando..." : "Siguiente"}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== STEP 6: Activate ====================

function Step6Activate({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  const completeMutation = trpc.onboarding.complete.useMutation({
    onSuccess: () => onComplete(),
    onError: (err) => toast.error(err.message),
  });

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Rocket className="size-8 text-primary" />
        </div>
        <CardTitle>¡Todo listo!</CardTitle>
        <CardDescription>
          Tu negocio está configurado. Activa el bot para empezar a recibir
          pedidos por WhatsApp.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 rounded-lg border p-4 text-sm">
          <p>Al activar:</p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>El bot responderá automáticamente a los mensajes de WhatsApp</li>
            <li>Los pedidos aparecerán en tu panel de control</li>
            <li>Recibirás notificaciones de nuevos pedidos</li>
            <li>Puedes pausar el bot en cualquier momento desde Ajustes</li>
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 size-4" />
            Atrás
          </Button>
          <Button
            size="lg"
            onClick={() => completeMutation.mutate()}
            disabled={completeMutation.isPending}
          >
            <PartyPopper className="mr-2 size-4" />
            {completeMutation.isPending
              ? "Activando..."
              : "Activar y empezar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== Confetti ====================

function ConfettiOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            backgroundColor: [
              "#f59e0b",
              "#3b82f6",
              "#10b981",
              "#ef4444",
              "#8b5cf6",
              "#ec4899",
            ][i % 6],
            width: `${6 + Math.random() * 6}px`,
            height: `${6 + Math.random() * 6}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
      <div className="flex h-full items-center justify-center">
        <div className="pointer-events-auto rounded-2xl bg-background/95 p-8 text-center shadow-xl max-w-sm mx-4">
          <PartyPopper className="mx-auto mb-4 size-12 text-primary" />
          <h2 className="text-2xl font-bold">¡Enhorabuena!</h2>
          <p className="mt-2 text-muted-foreground">
            Tu negocio está listo. Redirigiendo al panel...
          </p>
          <OnboardingInstallHint />
        </div>
      </div>
    </div>
  );
}

// ==================== Onboarding Install Hint ====================

function OnboardingInstallHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as { standalone?: boolean }).standalone === true)
    ) {
      return;
    }

    // iOS: always show manual hint
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIos) {
      setShow(true);
      return;
    }

    // Chrome/Edge: listen for install availability
    function handlePrompt(e: Event) {
      e.preventDefault();
      setShow(true);
    }
    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  if (!show) return null;

  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-left">
      <div className="flex items-start gap-2">
        {isIos ? (
          <Smartphone className="mt-0.5 size-4 shrink-0 text-primary" />
        ) : (
          <Download className="mt-0.5 size-4 shrink-0 text-primary" />
        )}
        <p className="text-xs text-muted-foreground">
          {isIos ? (
            <>
              Pulsa{" "}
              <Share className="inline size-3 align-text-bottom text-blue-500" />{" "}
              <span className="font-medium text-foreground">Compartir</span> y
              luego{" "}
              <span className="font-medium text-foreground">
                &quot;Añadir a pantalla de inicio&quot;
              </span>{" "}
              para acceder como app.
            </>
          ) : (
            <>
              <span className="font-medium text-foreground">
                Instala YaComanda
              </span>{" "}
              desde tu navegador para acceder con un toque y recibir
              notificaciones de pedidos.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
