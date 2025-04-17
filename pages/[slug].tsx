import PostTeaserList from "@/components/PostTeaserList";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";
import { title } from "process";
import { getPage, getPages } from "utils/actions";

export default function Page(props) {
  const router = useRouter();
  return (
    <div>
      <h1 className="pi-header--text text-center sm:text-left">
        {props.title}
      </h1>
      <p className="barcode text-center sm:text-left">
        The world is not so simple
      </p>
      <div className="pi-content">
        <DocumentRenderer document={props.content} />
      </div>
      {/* {props.page.pageType !== "standard" && (
        <PostTeaserList searchType="page" query={props.page.url} />
      )} */}
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
  return {
    props: {
      title: res.page.title,
      content: res.page.content.document,
    },
  };
}
