"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLES } from "@/config/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPlus, Trash2, Users } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  owner: "Propietario",
  admin: "Administrador",
  staff: "Staff",
};

const ROLE_COLORS: Record<string, string> = {
  owner: "bg-amber-100 text-amber-700",
  admin: "bg-blue-100 text-blue-700",
  staff: "bg-gray-100 text-gray-700",
};

export default function TeamSettingsPage() {
  const { data: members, isLoading } = trpc.team.list.useQuery();
  const utils = trpc.useUtils();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "staff" as string,
  });

  const inviteMutation = trpc.team.invite.useMutation({
    onSuccess: () => {
      toast.success("Miembro invitado");
      setInviteOpen(false);
      setInviteForm({ name: "", email: "", role: "staff" });
      utils.team.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateRoleMutation = trpc.team.updateRole.useMutation({
    onSuccess: () => {
      toast.success("Rol actualizado");
      utils.team.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const removeMutation = trpc.team.remove.useMutation({
    onSuccess: () => {
      toast.success("Miembro eliminado");
      utils.team.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 size-4" />
              Invitar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invitar miembro</DialogTitle>
              <DialogDescription>
                Añade un nuevo miembro a tu equipo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="invite-name">Nombre</Label>
                <Input
                  id="invite-name"
                  value={inviteForm.name}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, name: e.target.value })
                  }
                  placeholder="Nombre completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, email: e.target.value })
                  }
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select
                  value={inviteForm.role}
                  onValueChange={(v) =>
                    setInviteForm({ ...inviteForm, role: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() =>
                  inviteMutation.mutate({
                    name: inviteForm.name,
                    email: inviteForm.email,
                    role: inviteForm.role as (typeof USER_ROLES)[number],
                  })
                }
                disabled={
                  !inviteForm.name ||
                  !inviteForm.email ||
                  inviteMutation.isPending
                }
              >
                {inviteMutation.isPending ? "Invitando..." : "Invitar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b px-6 py-3">
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="hidden sm:block h-4 w-36" />
                  <Skeleton className="h-7 w-28" />
                </div>
              ))}
            </div>
          ) : !members?.length ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12">
              <Users className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No hay miembros.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="hidden sm:table-cell">Desde</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.name}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {member.email}
                    </TableCell>
                    <TableCell>
                      {member.role === "owner" ? (
                        <Badge
                          variant="secondary"
                          className={ROLE_COLORS.owner}
                        >
                          {ROLE_LABELS.owner}
                        </Badge>
                      ) : (
                        <Select
                          value={member.role ?? "staff"}
                          onValueChange={(v) =>
                            updateRoleMutation.mutate({
                              userId: member.id,
                              role: v as (typeof USER_ROLES)[number],
                            })
                          }
                        >
                          <SelectTrigger className="h-7 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">
                              Administrador
                            </SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                      {member.createdAt
                        ? new Date(member.createdAt).toLocaleDateString(
                            "es-ES",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            }
                          )
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {member.role !== "owner" && (
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() =>
                            removeMutation.mutate({ userId: member.id })
                          }
                          disabled={removeMutation.isPending}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
