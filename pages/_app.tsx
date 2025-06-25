import Layout from "@/components/layout";
import "../style/style.css";
import "../style/pistyle.css";
import { useEffect, useState } from "react";
import { getPages } from "utils/actions";
import { GoogleAnalytics } from '@next/third-parties/google'
export default function MyApp({ Component, pageProps }) {
  const [pageData, setPageData] = useState([]);
    useEffect(() => {
      getPages().then((res) => {
        setPageData(res.pages);
      }).catch((error) => {
        console.error("Error fetching pages:", error);
      });
    }, []);
  return (
    <Layout pageData={pageData}>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-ERTVKBNYH9" />
    </Layout>
  );
}
