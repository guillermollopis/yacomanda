"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";

export function PilotForm() {
  const [name, setName] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: `piloto-${whatsapp.replace(/\D/g, "")}@piloto.yacomanda.com`,
          phone: whatsapp,
          message: `[PILOTO] Restaurante: ${restaurant} | Ciudad: ${city} | WhatsApp: ${whatsapp}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al enviar");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle2 className="size-12 text-green-500" />
        <h3 className="text-xl font-semibold text-white">
          Solicitud recibida
        </h3>
        <p className="text-slate-400">
          Te contactaremos por WhatsApp en menos de 24 horas para explicarte
          todo y resolver tus dudas.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="pilot-name" className="text-slate-300">
          Tu nombre
        </Label>
        <Input
          id="pilot-name"
          placeholder="Juan Garcia"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={status === "loading"}
          className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pilot-restaurant" className="text-slate-300">
          Nombre del restaurante
        </Label>
        <Input
          id="pilot-restaurant"
          placeholder="Pizzeria La Nonna"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
          required
          disabled={status === "loading"}
          className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pilot-city" className="text-slate-300">
          Ciudad
        </Label>
        <Input
          id="pilot-city"
          placeholder="Valencia"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={status === "loading"}
          className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pilot-whatsapp" className="text-slate-300">
          Tu WhatsApp
        </Label>
        <Input
          id="pilot-whatsapp"
          type="tel"
          placeholder="+34 600 000 000"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          required
          disabled={status === "loading"}
          className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-500"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          {errorMsg || "Error al enviar. Intentalo de nuevo."}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-green-500 text-base font-semibold text-white hover:bg-green-400"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Quiero participar en el piloto"
        )}
      </Button>
    </form>
  );
}
