import './globals.css';

export const metadata = {
  title: 'Dashboard',
  description: 'Panel de control',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
