// pages/api/reset-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { token, new_password, confirm_password } = req.body;

  if (!token || !new_password || !confirm_password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    // Enviar datos tal cual al backend FastAPI
    const backendRes = await fetch('http://localhost:8000/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, new_password, confirm_password }),
    });

    const data = await backendRes.json();

    // Devuelve exactamente la respuesta del backend
    return res.status(backendRes.status).json(data);
  } catch (err) {
    console.error('Error reset-password:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
