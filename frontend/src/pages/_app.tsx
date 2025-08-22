import "@/globals.css";
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "../components/state/theme_context"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
     
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <ThemeProvider>
      <Component {...pageProps} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}
