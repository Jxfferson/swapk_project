//Importaciones de estilos
import '../assets/styles/inicio.css'; 
import "../assets/styles/login.css";
import "../assets/styles/registerPage.css";
import "../assets/styles/dashboard.css";
import "../assets/styles/profile.css";
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
