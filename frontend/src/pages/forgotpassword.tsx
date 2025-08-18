import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [token, setToken] = useState(''); // <- Guardar token del backend
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Enviar correo con código
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError(''); setSuccess('');

    if (!email) { setError('Ingresa un correo válido'); setIsLoading(false); return; }

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al enviar código');
      setSuccess('Correo enviado. Revisa tu bandeja de entrada.');
      setTimeout(() => setStep('code'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el correo');
    } finally { setIsLoading(false); }
  };

  // Verificar código
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError(''); setSuccess('');

    if (!code.match(/^\d{6}$/)) { setError('Ingresa un código de 6 dígitos'); setIsLoading(false); return; }

    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Código inválido');

      if (!data.token) throw new Error('Token no recibido del servidor');

      setToken(data.token); // Guardamos el token recibido
      setSuccess('Código verificado. Ingresa tu nueva contraseña.');
      setTimeout(() => setStep('reset'), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al verificar el código');
    } finally { setIsLoading(false); }
  };

  // Cambiar contraseña
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError(''); setSuccess('');

    if (password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); setIsLoading(false); return; }
    if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); setIsLoading(false); return; }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,                 // token recibido al verificar código
          new_password: password, // nombre exacto del campo esperado en tu backend
          confirm_password: confirmPassword
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al cambiar la contraseña');

      setSuccess('Contraseña cambiada exitosamente.');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar la contraseña');
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        {step === 'email' && (
          <>
            <h1 className="text-2xl font-bold text-center">Recuperar Contraseña</h1>
            {error && <div className="p-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
            {success && <div className="p-4 text-green-700 bg-green-100 rounded-lg">{success}</div>}
            <form onSubmit={handleSendEmail} className="space-y-6">
              <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
              <button type="submit" disabled={isLoading} className="w-full py-2 bg-blue-600 text-white rounded">{isLoading ? 'Enviando...' : 'Enviar Código'}</button>
            </form>
          </>
        )}

        {step === 'code' && (
          <>
            <h1 className="text-2xl font-bold text-center">Verificar Código</h1>
            {error && <div className="p-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
            {success && <div className="p-4 text-green-700 bg-green-100 rounded-lg">{success}</div>}
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <input type="text" placeholder="Código de 6 dígitos" value={code} maxLength={6} onChange={e => setCode(e.target.value)} className="w-full px-3 py-2 border rounded" />
              <button type="submit" disabled={isLoading} className="w-full py-2 bg-blue-600 text-white rounded">{isLoading ? 'Verificando...' : 'Verificar Código'}</button>
            </form>
          </>
        )}

        {step === 'reset' && (
          <>
            <h1 className="text-2xl font-bold text-center">Nueva Contraseña</h1>
            {error && <div className="p-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
            {success && <div className="p-4 text-green-700 bg-green-100 rounded-lg">{success}</div>}
            <form onSubmit={handleResetPassword} className="space-y-6">
              <input type="password" placeholder="Nueva contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
              <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
              <button type="submit" disabled={isLoading} className="w-full py-2 bg-green-600 text-white rounded">{isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
