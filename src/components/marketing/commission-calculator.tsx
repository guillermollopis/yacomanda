"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Loader2,
  TrendingDown,
  TrendingUp,
  Calculator,
  AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Platform commission data (% of order total)                        */
/* ------------------------------------------------------------------ */

const platforms = [
  { id: "glovo", name: "Glovo", commission: 0.30, color: "bg-yellow-500" },
  { id: "uber-eats", name: "Uber Eats", commission: 0.30, color: "bg-green-600" },
  { id: "just-eat", name: "Just Eat", commission: 0.25, color: "bg-orange-500" },
  { id: "rappi", name: "Rappi", commission: 0.28, color: "bg-red-500" },
  { id: "pedidosya", name: "PedidosYa", commission: 0.27, color: "bg-pink-500" },
  { id: "didifood", name: "Didi Food", commission: 0.25, color: "bg-orange-600" },
] as const;

const YACOMANDA_MONTHLY = 29; // EUR/USD per month

/* ------------------------------------------------------------------ */
/*  Currency helpers                                                   */
/* ------------------------------------------------------------------ */

function fmt(n: number, currency: string): string {
  if (currency === "EUR") return `${n.toLocaleString("es-ES", { maximumFractionDigits: 0 })} \u20ac`;
  if (currency === "USD") return `$${n.toLocaleString("es-ES", { maximumFractionDigits: 0 })}`;
  return `${n.toLocaleString("es-ES", { maximumFractionDigits: 0 })} ${currency}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CommissionCalculator() {
  // Inputs
  const [selectedPlatform, setSelectedPlatform] = useState("glovo");
  const [monthlyOrders, setMonthlyOrders] = useState(300);
  const [avgTicket, setAvgTicket] = useState(18);
  const [currency, setCurrency] = useState("EUR");

  // Lead capture
  const [email, setEmail] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const platform = platforms.find((p) => p.id === selectedPlatform)!;

  const calc = useMemo(() => {
    const monthlyRevenue = monthlyOrders * avgTicket;
    const monthlyCommission = monthlyRevenue * platform.commission;
    const yearlyCommission = monthlyCommission * 12;
    const yearlyYacomanda = YACOMANDA_MONTHLY * 12;
    const monthlySavings = monthlyCommission - YACOMANDA_MONTHLY;
    const yearlySavings = yearlyCommission - yearlyYacomanda;
    const savingsPercent = monthlyCommission > 0
      ? Math.round((monthlySavings / monthlyCommission) * 100)
      : 0;

    return {
      monthlyRevenue,
      monthlyCommission,
      yearlyCommission,
      yearlyYacomanda,
      monthlySavings,
      yearlySavings,
      savingsPercent,
      commissionPercent: Math.round(platform.commission * 100),
    };
  }, [monthlyOrders, avgTicket, platform]);

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLeadStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          restaurantName,
          platform: platform.name,
          monthlyOrders,
          avgTicket,
          currency,
          monthlyCommission: calc.monthlyCommission,
          yearlySavings: calc.yearlySavings,
        }),
      });

      if (!res.ok) throw new Error("Error");
      setLeadStatus("success");
    } catch {
      setLeadStatus("error");
    }
  }

  return (
    <div className="space-y-8">
      {/* ============ INPUTS ============ */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Platform + Inputs */}
        <div className="space-y-6">
          {/* Platform selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-slate-900">
              Plataforma que usas
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-all ${
                    selectedPlatform === p.id
                      ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {p.name}
                  <span className="block text-xs font-normal opacity-70">
                    {Math.round(p.commission * 100)}% comision
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Monthly orders */}
          <div className="space-y-2">
            <Label htmlFor="orders" className="text-base font-semibold text-slate-900">
              Pedidos al mes
            </Label>
            <Input
              id="orders"
              type="number"
              min={1}
              max={10000}
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(Math.max(1, Number(e.target.value)))}
              className="text-lg font-semibold"
            />
            <div className="flex gap-2">
              {[100, 300, 500, 1000].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setMonthlyOrders(n)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    monthlyOrders === n
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Avg ticket */}
          <div className="space-y-2">
            <Label htmlFor="ticket" className="text-base font-semibold text-slate-900">
              Ticket medio
            </Label>
            <div className="flex gap-2">
              <Input
                id="ticket"
                type="number"
                min={1}
                max={500}
                value={avgTicket}
                onChange={(e) => setAvgTicket(Math.max(1, Number(e.target.value)))}
                className="text-lg font-semibold"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div className="flex gap-2">
              {[12, 18, 25, 35].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setAvgTicket(n)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    avgTicket === n
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {fmt(n, currency)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          {/* Current cost card */}
          <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <TrendingDown className="size-4" />
              Lo que pierdes con {platform.name}
            </div>
            <div className="mt-3 text-4xl font-black text-red-600">
              {fmt(calc.monthlyCommission, currency)}
              <span className="text-base font-medium text-red-400">/mes</span>
            </div>
            <div className="mt-1 text-sm text-red-500">
              {fmt(calc.yearlyCommission, currency)} al ano &middot; {calc.commissionPercent}% de tus ventas
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-100/60 p-2.5 text-xs text-red-700">
              <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
              <span>
                Con {monthlyOrders} pedidos/mes de {fmt(avgTicket, currency)} de media,
                estas regalando <strong>{fmt(calc.yearlyCommission, currency)} al ano</strong> a {platform.name}.
              </span>
            </div>
          </div>

          {/* YaComanda cost card */}
          <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
              <TrendingUp className="size-4" />
              Lo que pagas con YaComanda
            </div>
            <div className="mt-3 text-4xl font-black text-green-600">
              {fmt(YACOMANDA_MONTHLY, currency)}
              <span className="text-base font-medium text-green-400">/mes</span>
            </div>
            <div className="mt-1 text-sm text-green-500">
              {fmt(YACOMANDA_MONTHLY * 12, currency)} al ano &middot; tarifa plana sin comisiones
            </div>
          </div>

          {/* Savings card */}
          <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 p-5 text-white">
            <div className="text-sm font-semibold text-slate-300">
              Tu ahorro con YaComanda
            </div>
            <div className="mt-2 text-4xl font-black text-green-400">
              {fmt(calc.yearlySavings, currency)}
              <span className="text-base font-medium text-green-300">/ano</span>
            </div>
            <div className="mt-1 text-sm text-slate-400">
              {fmt(calc.monthlySavings, currency)}/mes &middot; ahorras el {calc.savingsPercent}% de tus comisiones
            </div>
          </div>
        </div>
      </div>

      {/* ============ LEAD CAPTURE ============ */}
      <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 p-6 md:p-8">
        {leadStatus === "success" ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle2 className="size-12 text-green-600" />
            <h3 className="text-xl font-bold text-slate-900">Informe enviado</h3>
            <p className="text-sm text-slate-500">
              Revisa tu email. Hemos enviado un informe personalizado con el ahorro
              de {restaurantName} y los pasos para empezar.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                Recibe un informe personalizado gratis
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Te enviamos un desglose detallado del ahorro de tu restaurante
                y como empezar a recibir pedidos por WhatsApp sin comisiones.
              </p>
            </div>
            <form
              onSubmit={handleLeadSubmit}
              className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <Input
                type="text"
                placeholder="Nombre del restaurante"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                required
                disabled={leadStatus === "loading"}
                className="flex-1"
              />
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={leadStatus === "loading"}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={leadStatus === "loading"}
                className="bg-green-600 font-semibold text-white shadow-lg shadow-green-600/25 hover:bg-green-500 whitespace-nowrap"
              >
                {leadStatus === "loading" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <Calculator className="mr-1.5 size-4" />
                    Enviar informe
                  </>
                )}
              </Button>
            </form>
            {leadStatus === "error" && (
              <p className="mt-3 text-center text-sm text-red-600">
                Error al enviar. Intentalo de nuevo.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
