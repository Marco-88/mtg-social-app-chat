import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pokus MTG Social App",
    description: "Post, comment, chat and so on",
};

type RootLayoutProps = Readonly<{ children: React.ReactNode; }>;

export default function RootLayout({ children, }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}
