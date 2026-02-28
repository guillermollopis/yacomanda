"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subject = encodeURIComponent(
    `Contacto desde yacomanda.com — ${name || "Sin nombre"}`
  );
  const body = encodeURIComponent(
    `Nombre: ${name}\nEmail: ${email}\n\n${message}`
  );
  const mailtoHref = `mailto:hola@yacomanda.com?subject=${subject}&body=${body}`;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoHref;
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="contact-name">Nombre</Label>
        <Input
          id="contact-name"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Mensaje</Label>
        <Textarea
          id="contact-message"
          placeholder="¿En que podemos ayudarte?"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Enviar mensaje
      </Button>
    </form>
  );
}
