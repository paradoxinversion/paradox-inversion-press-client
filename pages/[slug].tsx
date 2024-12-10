import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";
import { getPage, getPages } from "utils/actions";

export default function Page(props) {
  const router = useRouter();
  return (
    <div>
      <p className="barcode text-center sm:text-left">
        The world is not so simple
      </p>
      <DocumentRenderer document={props.content} />
    </div>
  );
}
export async function getStaticPaths() {
  const res = await getPages();
  const paths = res.pages.map((page) => ({
    params: { slug: page.url },
  }));
  return { paths, fallback: true };
}
export async function getStaticProps(ctx) {
  const res = await getPage(ctx.params.slug);

  console.log("RES", res);
  return {
    props: {
      content: res.page.content.document,
    },
  };
}
