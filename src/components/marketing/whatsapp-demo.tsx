"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  from: "customer" | "bot";
  typing?: boolean;
}

interface QuickReply {
  label: string;
  message: string;
}

// Scripted conversation flow
const conversationFlow: {
  trigger: string[];
  response: string;
  quickReplies?: QuickReply[];
}[] = [
  {
    trigger: ["hola", "buenas", "hey", "ey", "buenos", "hello", "menu", "carta"],
    response:
      "Hola! Bienvenido a Pizzeria Demo. Aqui tienes nuestra carta:\n\n🍕 *Pizzas*\n- Margarita — 9,50€\n- Pepperoni — 11€\n- BBQ Pollo — 12,50€\n- Cuatro Quesos — 11,50€\n\n🥗 *Entrantes*\n- Ensalada Cesar — 7€\n- Alitas de pollo (8u) — 8,50€\n\n🥤 *Bebidas*\n- Coca-Cola — 2,50€\n- Agua — 1,50€\n- Cerveza — 3€\n\n¿Que te apetece?",
    quickReplies: [
      { label: "🍕 2 Margaritas", message: "Quiero 2 pizzas margarita" },
      { label: "🍕 1 BBQ + Coca", message: "Una pizza BBQ pollo y una coca cola" },
      { label: "🥗 Ensalada + Agua", message: "Una ensalada cesar y un agua" },
    ],
  },
  {
    trigger: ["margarita", "pepperoni", "bbq", "quesos", "pizza", "ensalada", "alitas", "coca", "agua", "cerveza", "quiero", "ponme", "dame"],
    response:
      "Perfecto! Tu pedido:\n\n📋 *Pedido #127*\n{orderSummary}\n\n💳 Total: {total}\n\nTe envio el enlace de pago para que pagues con tarjeta, o puedes pagar en efectivo a la entrega. ¿Que prefieres?",
    quickReplies: [
      { label: "💳 Tarjeta", message: "Pago con tarjeta" },
      { label: "💵 Efectivo", message: "Efectivo" },
    ],
  },
  {
    trigger: ["tarjeta", "card", "pago", "pagar"],
    response:
      "Aqui tienes tu enlace de pago seguro:\n\n🔒 pay.yacomanda.com/pedido-127\n\n✅ Pago recibido! Gracias!\n\n⏱️ Tu pedido estara listo en 25-30 minutos.\n\n¿Algo mas que necesites?",
    quickReplies: [
      { label: "👍 Gracias!", message: "Gracias, eso es todo!" },
    ],
  },
  {
    trigger: ["efectivo", "cash"],
    response:
      "Perfecto, pagaras en efectivo a la entrega.\n\n✅ *Pedido #127 confirmado!*\n\n⏱️ Tu pedido estara listo en 25-30 minutos.\nTe avisaremos cuando este en camino.\n\n¿Algo mas que necesites?",
    quickReplies: [
      { label: "👍 Gracias!", message: "Gracias, eso es todo!" },
    ],
  },
  {
    trigger: ["gracias", "eso es todo", "nada", "no", "adios", "bye"],
    response:
      "Gracias por tu pedido! Que lo disfrutes 🎉\n\nRecuerda que puedes pedir cuando quieras escribiendonos por WhatsApp. Hasta pronto!",
    quickReplies: [
      { label: "🔄 Empezar de nuevo", message: "hola" },
    ],
  },
];

function parseOrder(text: string): { summary: string; total: string } {
  const items: { name: string; qty: number; price: number }[] = [];
  const lower = text.toLowerCase();

  const menu: Record<string, number> = {
    margarita: 9.5,
    pepperoni: 11,
    "bbq pollo": 12.5,
    "bbq": 12.5,
    "cuatro quesos": 11.5,
    "ensalada cesar": 7,
    "ensalada": 7,
    alitas: 8.5,
    "coca cola": 2.5,
    "coca": 2.5,
    agua: 1.5,
    cerveza: 3,
  };

  // Extract quantities
  const qtyPatterns = [
    /(\d+)\s*(?:x\s*)?(pizzas?\s+)?margarita/i,
    /(\d+)\s*(?:x\s*)?(pizzas?\s+)?pepperoni/i,
    /(\d+)\s*(?:x\s*)?(pizzas?\s+)?bbq/i,
    /(\d+)\s*(?:x\s*)?(pizzas?\s+)?cuatro quesos/i,
    /(\d+)\s*(?:x\s*)?ensalada/i,
    /(\d+)\s*(?:x\s*)?alitas/i,
    /(\d+)\s*(?:x\s*)?coca/i,
    /(\d+)\s*(?:x\s*)?agua/i,
    /(\d+)\s*(?:x\s*)?cerveza/i,
  ];

  const itemNames = ["margarita", "pepperoni", "bbq", "cuatro quesos", "ensalada", "alitas", "coca", "agua", "cerveza"];
  const displayNames = ["Pizza Margarita", "Pizza Pepperoni", "Pizza BBQ Pollo", "Pizza Cuatro Quesos", "Ensalada Cesar", "Alitas de pollo", "Coca-Cola", "Agua", "Cerveza"];

  for (let i = 0; i < qtyPatterns.length; i++) {
    const match = lower.match(qtyPatterns[i]);
    if (match) {
      items.push({ name: displayNames[i], qty: parseInt(match[1]), price: menu[itemNames[i]] });
    } else if (lower.includes(itemNames[i])) {
      // Check for "una/un" prefix
      const unaMatch = lower.match(new RegExp(`una?\\s+(?:pizza\\s+)?${itemNames[i]}`, "i"));
      const qty = unaMatch ? 1 : 1;
      items.push({ name: displayNames[i], qty, price: menu[itemNames[i]] });
    }
  }

  if (items.length === 0) {
    items.push({ name: "Pizza Margarita", qty: 1, price: 9.5 });
  }

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const summary = items
    .map((item) => `- ${item.qty}x ${item.name} — ${(item.qty * item.price).toFixed(2).replace(".", ",")}€`)
    .join("\n");

  return { summary, total: `${total.toFixed(2).replace(".", ",")}€` };
}

function findResponse(input: string): { response: string; quickReplies?: QuickReply[] } {
  const lower = input.toLowerCase().trim();

  for (const flow of conversationFlow) {
    for (const trigger of flow.trigger) {
      if (lower.includes(trigger)) {
        let response = flow.response;

        // Replace order placeholders if this is an order response
        if (response.includes("{orderSummary}")) {
          const { summary, total } = parseOrder(input);
          response = response.replace("{orderSummary}", summary).replace("{total}", total);
        }

        return { response, quickReplies: flow.quickReplies };
      }
    }
  }

  return {
    response:
      "No he entendido del todo. ¿Quieres ver nuestra carta? Escribe \"menu\" o elige una opcion:",
    quickReplies: [
      { label: "📋 Ver carta", message: "menu" },
      { label: "🍕 Pedir pizza", message: "Quiero una pizza margarita" },
    ],
  };
}

export function WhatsAppDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hola! Soy el bot de *Pizzeria Demo*. Escribe un mensaje o pulsa un boton para ver como funciona YaComanda.\n\n¿Que quieres hacer?",
      from: "bot",
    },
  ]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([
    { label: "📋 Ver carta", message: "Quiero ver el menu" },
    { label: "🍕 Pedir directo", message: "Quiero 2 pizzas margarita y una coca cola" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let nextId = useRef(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const customerMsg: Message = {
      id: nextId.current++,
      text: text.trim(),
      from: "customer",
    };

    setMessages((prev) => [...prev, customerMsg]);
    setInput("");
    setQuickReplies([]);
    setIsTyping(true);

    // Simulate bot typing delay
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const { response, quickReplies: newReplies } = findResponse(text);
      const botMsg: Message = {
        id: nextId.current++,
        text: response,
        from: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setQuickReplies(newReplies || []);
      setIsTyping(false);
    }, delay);
  };

  const formatText = (text: string) => {
    // Bold: *text* → <strong>
    // Newlines → <br>
    return text
      .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  };

  return (
    <section id="demo" className="scroll-mt-20 px-4 py-24 bg-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-600">
            <Sparkles className="size-3.5" />
            Demo interactiva
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Pruebalo{" "}
            <span className="text-gradient-green">ahora mismo</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Asi es como tus clientes pediran por WhatsApp. Escribe un mensaje o pulsa los botones para simular un pedido completo.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          {/* Phone frame */}
          <div className="overflow-hidden rounded-[2rem] border-[3px] border-slate-800 bg-slate-900 shadow-2xl shadow-slate-900/30">
            {/* Status bar */}
            <div className="flex items-center justify-between bg-slate-900 px-6 py-2 text-[11px] text-white/60">
              <span>9:41</span>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-4 rounded-sm border border-white/40">
                  <div className="m-[1px] h-[calc(100%-2px)] w-[60%] rounded-[1px] bg-white/60" />
                </div>
              </div>
            </div>

            {/* WhatsApp header */}
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-white/20">
                <Bot className="size-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Pizzeria Demo</p>
                <p className="text-[11px] text-green-200">en linea</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="rounded-full bg-green-400/30 px-2 py-0.5 text-[10px] font-semibold text-green-200">
                  IA YaComanda
                </span>
              </div>
            </div>

            {/* Chat area */}
            <div
              className="flex h-[420px] flex-col gap-2 overflow-y-auto bg-[#ECE5DD] p-3"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c0b6' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
                      msg.from === "customer"
                        ? "rounded-tr-none bg-[#DCF8C6] text-slate-800"
                        : "rounded-tl-none bg-white text-slate-800"
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                  />
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-lg rounded-tl-none bg-white px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="size-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                      <div className="size-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                      <div className="size-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 bg-[#ECE5DD] px-3 pb-2">
                {quickReplies.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={() => sendMessage(qr.message)}
                    disabled={isTyping}
                    className="rounded-full border border-[#075E54]/30 bg-white px-3 py-1.5 text-xs font-medium text-[#075E54] shadow-sm transition-all hover:bg-[#075E54] hover:text-white disabled:opacity-50"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="flex items-center gap-2 bg-[#F0F0F0] px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(input);
                }}
                placeholder="Escribe un mensaje..."
                disabled={isTyping}
                className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="flex size-9 items-center justify-center rounded-full bg-[#075E54] text-white transition-colors hover:bg-[#064E46] disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>

          {/* Caption below phone */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Esto es una simulacion. Con YaComanda, tu restaurante tendra un bot real en WhatsApp respondiendo 24/7.
          </p>
        </div>
      </div>
    </section>
  );
}
