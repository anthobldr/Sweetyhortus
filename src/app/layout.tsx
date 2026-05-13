import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import "./globals.css";
import Script from 'next/script';

export default async function RootLayout({ children, }: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="fr">
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        </body>
    </html>
  );
}
