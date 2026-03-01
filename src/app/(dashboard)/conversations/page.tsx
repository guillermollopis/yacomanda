"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bot,
  Send,
  ArrowLeft,
  UserRound,
  AlertTriangle,
  CheckCheck,
} from "lucide-react";

type ConversationStatus = "active" | "escalated" | "closed";

export default function ConversationsPage() {
  const [statusFilter, setStatusFilter] = useState<
    ConversationStatus | "all"
  >("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: listData, isLoading: listLoading } =
    trpc.conversations.list.useQuery(
      statusFilter === "all" ? undefined : { status: statusFilter },
      { refetchInterval: 15_000 }
    );

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
      {/* Header — only visible when no conversation selected on mobile */}
      <div className={cn("shrink-0", selectedId && "hidden md:block")}>
        <h1 className="text-2xl font-bold">Conversaciones</h1>
        <Tabs
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as ConversationStatus | "all")}
          className="mt-3"
        >
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Activas</TabsTrigger>
            <TabsTrigger value="escalated">Escaladas</TabsTrigger>
            <TabsTrigger value="closed">Cerradas</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Split layout */}
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-lg border">
        {/* Left panel — conversation list */}
        <div
          className={cn(
            "w-full flex-col border-r md:flex md:w-80 lg:w-96",
            selectedId ? "hidden md:flex" : "flex"
          )}
        >
          <div className="flex-1 overflow-y-auto">
            {listLoading ? (
              <div className="space-y-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 border-b p-3">
                    <Skeleton className="size-10 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !listData?.items.length ? (
              <p className="p-4 text-sm text-muted-foreground">
                No hay conversaciones.
              </p>
            ) : (
              listData.items.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b p-3 text-left transition-colors hover:bg-accent/50",
                    selectedId === conv.id && "border-l-2 border-l-primary bg-accent"
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <UserRound className="size-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium">
                        {conv.customerName || conv.customerPhone || "Desconocido"}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {conv.lastMessageAt
                          ? formatTime(new Date(conv.lastMessageAt))
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-muted-foreground">
                        {conv.lastMessageDirection === "outbound" && (
                          <CheckCheck className="mr-1 inline size-3" />
                        )}
                        {conv.lastMessage || "Sin mensajes"}
                      </p>
                      {conv.status === "escalated" && (
                        <Badge
                          variant="destructive"
                          className="shrink-0 text-[10px] px-1.5 py-0"
                        >
                          Escalada
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right panel — chat view */}
        <div
          className={cn(
            "flex-1 flex-col",
            selectedId ? "flex" : "hidden md:flex"
          )}
        >
          {selectedId ? (
            <ChatView
              conversationId={selectedId}
              onBack={() => setSelectedId(null)}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              <p className="text-sm">Selecciona una conversación</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Chat View ---

function ChatView({
  conversationId,
  onBack,
}: {
  conversationId: string;
  onBack: () => void;
}) {
  const [message, setMessage] = useState("");
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.conversations.get.useQuery(
    { id: conversationId },
    { refetchInterval: 10_000 }
  );

  const sendMutation = trpc.conversations.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
      utils.conversations.get.invalidate({ id: conversationId });
      utils.conversations.list.invalidate();
    },
  });

  const returnToBot = trpc.conversations.returnToBot.useMutation({
    onSuccess: () => {
      utils.conversations.get.invalidate({ id: conversationId });
      utils.conversations.list.invalidate();
    },
  });

  const closeMutation = trpc.conversations.close.useMutation({
    onSuccess: () => {
      utils.conversations.get.invalidate({ id: conversationId });
      utils.conversations.list.invalidate();
    },
  });

  function handleSend() {
    const text = message.trim();
    if (!text) return;
    sendMutation.mutate({ conversationId, content: text });
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Skeleton className="size-8 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <div className="flex-1 space-y-3 p-4">
          <Skeleton className="ml-auto h-10 w-48 rounded-2xl" />
          <Skeleton className="h-10 w-56 rounded-2xl" />
          <Skeleton className="ml-auto h-10 w-40 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onBack}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {data.customerName || data.customerPhone || "Desconocido"}
          </p>
          <p className="text-xs text-muted-foreground">
            {data.customerPhone}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {data.status === "escalated" && (
            <>
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="size-3" />
                Escalada
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => returnToBot.mutate({ id: conversationId })}
                disabled={returnToBot.isPending}
              >
                <Bot className="mr-1 size-3" />
                Devolver al bot
              </Button>
            </>
          )}
          {data.status === "active" && (
            <Badge variant="secondary" className="gap-1">
              <Bot className="size-3" />
              Bot activo
            </Badge>
          )}
          {data.status !== "closed" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => closeMutation.mutate({ id: conversationId })}
              disabled={closeMutation.isPending}
              className="text-muted-foreground"
            >
              Cerrar
            </Button>
          )}
          {data.status === "closed" && (
            <Badge variant="outline">Cerrada</Badge>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col-reverse overflow-y-auto p-4">
        <div className="space-y-3">
          {data.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.direction === "outbound" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[75%] px-4 py-2 text-sm shadow-sm",
                  msg.direction === "outbound"
                    ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-2xl rounded-bl-md bg-muted"
                )}
              >
                {msg.messageType === "text" ? (
                  <p className="whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                ) : msg.messageType === "image" && msg.mediaUrl ? (
                  <img
                    src={msg.mediaUrl}
                    alt="Imagen"
                    className="max-w-full rounded-lg"
                  />
                ) : msg.messageType === "audio" ? (
                  <p className="italic">Mensaje de audio</p>
                ) : (
                  <p className="italic">
                    {msg.content || `[${msg.messageType}]`}
                  </p>
                )}
                <p
                  className={cn(
                    "mt-1 text-[10px]",
                    msg.direction === "outbound"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      {data.status !== "closed" && (
        <div className="border-t p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1"
              disabled={sendMutation.isPending}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || sendMutation.isPending}
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

// --- Helpers ---

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (diff < oneDay && now.getDate() === date.getDate()) {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (diff < 7 * oneDay) {
    return date.toLocaleDateString("es-ES", { weekday: "short" });
  }

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
  });
}
