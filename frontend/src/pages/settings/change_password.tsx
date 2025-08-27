"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import SettingsLayout from "../../components/settings_layout";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(""); // ✅ Nombre de usuario
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  // 🔁 Cargar datos del usuario al iniciar
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUserStr = localStorage.getItem("user");
        if (!savedUserStr) {
          toast.error("No has iniciado sesión");
          return;
        }

        const savedUser = JSON.parse(savedUserStr);
        // Usa perfil.nombre o user.nombre
        setUsername(savedUser.perfil?.nombre || savedUser.user?.nombre || "");
      } catch (err) {
        console.error("Error al cargar usuario:", err);
        toast.error("Error al cargar tus datos");
      }
    };

    loadUserData();
  }, []);

  // ✅ Cambiar contraseña o nombre de usuario
  const handleSubmit = async () => {
    // Validaciones
    if (!username.trim()) {
      toast.error("El nombre de usuario no puede estar vacío");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const savedUserStr = localStorage.getItem("user");
      if (!savedUserStr) {
        toast.error("No has iniciado sesión");
        setLoading(false);
        return;
      }

      const savedUser = JSON.parse(savedUserStr);
      const token = savedUser.token;
      const userId = savedUser.id;

      // ✅ Enviar al backend
      const res = await fetch(`http://localhost:8000/perfil/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: username, // ✅ Cambia el nombre de usuario
          ...(newPassword && { contrasena: newPassword }), // ✅ Solo si cambia la contraseña
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Error al actualizar");
      }

      // ✅ Éxito: actualizar localStorage
      const updatedUser = {
        ...savedUser,
        perfil: { ...savedUser.perfil, nombre: username },
        user: { ...savedUser.user, nombre: username },
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("✅ Datos actualizados correctamente");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Cambiar contraseña y usuario</h1>

        <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
          <CardHeader>
            <CardTitle>Actualizar datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nombre de usuario */}
            <div>
              <label className="block text-sm font-medium mb-2">Nombre de usuario</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre de usuario"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* Contraseña actual */}
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña actual</label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                  placeholder="Ingresa tu contraseña actual"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div>
              <label className="block text-sm font-medium mb-2">Nueva contraseña (opcional)</label>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                  placeholder="Mínimo 6 caracteres"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Confirmar nueva contraseña */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirmar nueva contraseña</label>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                  placeholder="Repite la nueva contraseña"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Botón */}
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  );
}