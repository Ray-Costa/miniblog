import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { PostProvider } from "@/contexts/PostContext";

export default function App({ Component, pageProps }) {
  return <PostProvider><Layout><Component {...pageProps} /></Layout></PostProvider>;
}
