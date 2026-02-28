import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/orders", label: "Pedidos", icon: ShoppingCart },
  { href: "/catalog", label: "Carta", icon: UtensilsCrossed },
  { href: "/conversations", label: "Conversaciones", icon: MessageSquare },
  { href: "/customers", label: "Clientes", icon: Users },
  { href: "/analytics", label: "Estadísticas", icon: BarChart3 },
  { href: "/settings", label: "Ajustes", icon: Settings },
  { href: "/billing", label: "Facturación", icon: CreditCard },
] as const;

export const adminNavItems = [
  { href: "/admin/pending-setup", label: "Pendientes", icon: ShieldCheck },
] as const;
