import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/public/favicon.ico"/>
        <title>THE BLOG</title>
      </Head>
      <Navbar/>
      <main className="main-container">{children}</main>
      <Footer/>
    </>
  );
}
