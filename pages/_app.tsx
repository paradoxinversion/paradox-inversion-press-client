import Layout from "@/components/layout";
import "../style/style.css";
import "../style/pistyle.css";
import { useEffect, useState } from "react";
import { getPages } from "utils/actions";
export default function MyApp({ Component, pageProps }) {
  const [pageData, setPageData] = useState([]);
    useEffect(() => {
      console.log("Fetching pages data...");
      getPages().then((res) => {
        setPageData(res.pages);
        console.log("Pages data fetched:", res.pages);
      }).catch((error) => {
        console.error("Error fetching pages:", error);
      });
    }, []);
  return (
    <Layout pageData={pageData}>
      <Component {...pageProps} />
    </Layout>
  );
}
