import React, { useState } from 'react';
import { Settings, Apple, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

interface LoginFormData {
  emailOrUsername: string;
  password: string;
  showPassword: boolean;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrUsername: "",
    password: "",
    showPassword: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleRegister = () => {
    console.log('Register clicked');
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <div className="logo-header">
          <div className="logo-container">
            <a href="./">
              <Image 
                src="/img/logoswapk.png"
                alt="Logo Swapk"
                width={35}
                height={35}
                className="logo"
              />
            </a>
          </div>
          <span className="logo-text">SWAPK</span>
        </div>
      </header>

      <div className="login-container">
        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="form-container">
            {/* Logo */}
            <div className="form-logo">
              <div className="logo-container">
                <a href="./">
                            <Image 
                              src="/img/logoswapk.png"
                              alt="Logo Swapk"
                              width={35}
                              height={35}
                              className="logo"
                            />
                </a>
              </div>
              <h1 className="form-title">
                Sw<span className="highlight">a</span>pk
              </h1>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  name="emailOrUsername"
                  placeholder="Correo electrónico o usuario"
                  value={formData.emailOrUsername}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input password-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {formData.showPassword ? (
                    <EyeOff className="eye-icon" />
                  ) : (
                    <Eye className="eye-icon" />
                  )}
                </button>
              </div>

              <button type="submit" className="login-button">
                Iniciar sesión
              </button>
            </form>

            {/* Social Login */}
            <div className="social-section">
              <p className="social-text">Otras opciones de inicio de sesión</p>
              <div className="social-buttons">
                <button 
                  className="social-btn apple-btn"
                  onClick={() => handleSocialLogin('Apple')}
                >
                  <Apple className="social-icon" />
                </button>
                <button 
                  className="social-btn facebook-btn"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button 
                  className="social-btn google-btn"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Footer Links */}
            <div className="footer-links">
              <button className="forgot-password-link" onClick={handleForgotPassword}>
                ¿Olvidaste tu contraseña?
              </button>
              <div className="register-link">
                <span className="register-text">¿No tienes una cuenta? </span>
                <a href="./register">
                <button className="register-link-btn" onClick={handleRegister}>
                  Regístrate gratis.
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
