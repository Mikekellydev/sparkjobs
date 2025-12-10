import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SparkJobs | SparkwaveITService.com",
  description:
    "Open-source veteran-focused job discovery for remote and hybrid roles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="mx-auto min-h-screen max-w-6xl px-6 pb-16 pt-10">
          {children}
        </div>
      </body>
    </html>
  );
}
