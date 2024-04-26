import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import  Provider  from './StoreProvider';
import {SocketProvider} from "../context/SocketProvider"
import { Providers } from "./providers";
import { ThemeProvider } from "./theme-provider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bhasha Buddy",
  description: "",
  icons:"mascot-2.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" >
       <Provider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Providers>
        <SocketProvider>
        <body className={font.className}>{children}</body>
        </SocketProvider>
        </Providers>
        </ThemeProvider>
        </Provider>
      </html>
  );
}
