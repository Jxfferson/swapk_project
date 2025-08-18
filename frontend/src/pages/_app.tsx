import type { AppProps } from 'next/app'
import "@/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}