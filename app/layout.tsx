import { ClerkProvider  } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/layout/NavBar';
import { ThemeProvider } from "@/components/theme-provider"
import Conatainer from '@/components/ui/container';
import "@uploadthing/react/styles.css";
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: "Hotel Management app",
  description: "Hotel Management app by Evolution In Sight LLP ",
  icons: "/logo.svg",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" suppressHydrationWarning>
    
      
      <body className={cn(inter.className,{'debug-screens':process.  env.NODE_ENV === 'development'})}>
       
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
        <Toaster/>
        <main className='flex flex-col min-h-screen 
        bg-secondary'>
           <ClerkProvider>
        <NavBar/>
        <section className='flex-grow'>
          <Conatainer>
             {children} 
          </Conatainer>
        </section>
        </ClerkProvider>
        </main>
        </ThemeProvider>
        
        </body>
        
    </html>
  );
}
