import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SocialDock from "@/components/SocialDock";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xenobios - El Despertar de las Ánimas",
  description: "Un RPG multijugador de supervivencia, alianzas y magia ancestral.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased cursor-none`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Fractal Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.65" 
                numOctaves="3" 
                stitchTiles="stitch" 
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <CustomCursor />
        {children}
        <SocialDock />
      </body>
    </html>
  );
}
