import { ClerkProvider, UserButton } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/layout/NavBar';
import { ThemeProvider } from "@/components/theme-provider"




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel Managemet app",
  description: "Hotel Management app by Evolution In Sight LLP ",
  icons: "/logo.svg",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
      
      <body className={inter.className}>
        <main className='flex flex-col min-h-screen 
        bg-secondary'>
        <NavBar/>
        <section className='flex-grow'>
        {children}
        </section>
        </main>
        </body>
        </ThemeProvider>
    </html>
    </ClerkProvider>
  );
}
