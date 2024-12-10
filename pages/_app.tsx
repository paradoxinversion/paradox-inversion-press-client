import Layout from "@/components/layout";
import "../style/style.css";
import "../style/pistyle.css";
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
