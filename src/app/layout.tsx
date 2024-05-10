import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "react-hot-toast";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pokus MTG Social App",
    description: "Post, comment, chat and so on",
    icons: {
        icon: '/favicon.ico',
    },
};

type RootLayoutProps = Readonly<{ children: React.ReactNode; }>;

export default async function RootLayout({ children, }: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <div>
                <Toaster position="top-center"/>
            </div>
            <Navbar/>
            <main className="container">
                {children}
            </main>
            <Footer/>
            </body>
        </html>
    );
}
