// app/layout.js
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Sifat Islam — Portfolio",
  description: "Projects, experience, and contact for Sifat Islam (CS @ UTD)",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-accent="orange" suppressHydrationWarning>
      <head>
        {/* Set the data-accent attribute ASAP (no styles on <html>!) */}
        <Script id="accent-init" strategy="beforeInteractive">
          {`
try {
var k = localStorage.getItem('accentKey') || 'orange';
document.documentElement.setAttribute('data-accent', k);
} catch (e) {}
`}
        </Script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
