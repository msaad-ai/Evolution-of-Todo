import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "TaskForge - Organize smarter. Build better habits.",
  description: "Your personal productivity companion. Create, manage, and complete tasks with ease.",
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
