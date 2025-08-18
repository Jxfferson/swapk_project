// src/pages/api/verify-code.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    // Enviar la solicitud a tu backend FastAPI
    const backendRes = await fetch("http://localhost:8000/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await backendRes.json();

    // Si el backend devuelve un error, lo enviamos tal cual
    if (!backendRes.ok) {
      return res.status(backendRes.status).json(data);
    }

    // Validación extra: asegurarse de que token exista
    if (!data.token) {
      return res.status(500).json({ message: "Token no recibido del servidor" });
    }

    // Respuesta exitosa al frontend
    res.status(200).json({ message: data.message, token: data.token });
  } catch (err) {
    console.error("Error verificando código:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
