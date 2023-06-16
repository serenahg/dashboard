"use client";
import { useRouter } from "next/navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import Header from "@/components/UI/Header";

export const metadata = {
  title: "Hesco Group",
  description: "A giant App",
};

export default function RootLayout({ children }) {
  const userLoggedIn = false;
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userLoggedIn) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <html lang="en">
      <body className={` min-h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
