import "./globals.css";

export const metadata = {
  title: "Sodhak AI - LLM Red Teaming",
  description:
    "Sodhak AI runs adversarial LLM red teaming to uncover jailbreaks, data leakage, and unsafe tool behavior.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#06090d" />
      </head>
      <body>{children}</body>
    </html>
  );
}
