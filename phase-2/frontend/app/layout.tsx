import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Phase-2 Todo App",
  description: "Multi-user todo application with JWT authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
