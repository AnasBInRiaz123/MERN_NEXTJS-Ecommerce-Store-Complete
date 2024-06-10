"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../../components/UI/Header/Header";
import Footer from "../../components/UI/Footer/Footer";
import ProviderWrapper from "../../components/Provider";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/UI/Loading";
import { title } from "./tiltle";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(()=>{
    document.title= title.title
  },[])
  const [loading, setLoading]= useState(true)

  useEffect(()=>{
    const timeout= setTimeout(()=>{
      setLoading(false)
    }, 2000)
    return ()=> clearTimeout(timeout)
  },[])
  return (
    <ProviderWrapper>
    <html lang="en">
      <body className="page-container">
        <Header/>
        {loading ? <LoadingPage/>:
        <div className="content-wrap">
          {children}
        </div>}
{/* // Dev Pulse Studio */}

        <Footer/>
      </body>
    </html>
    </ProviderWrapper>
  );
}