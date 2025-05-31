import { DocumentRenderer } from "@keystone-6/document-renderer";
import { getPage, getPages, getSeriesPosts } from "utils/actions";

export default function Page(props) {
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
    </div>
  );
}

export async function getStaticPaths() {
  const res = await getPages();
  const paths = res.pages.map((page) => ({
    params: { slug: page.url },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const res = await getPage(ctx.params.slug);
  const series = await getSeriesPosts(ctx.params.slug);
  return {
    props: {
      title: res.page.title,
      content: res.page.content.document,
      pageType: res.page.pageType,
      seriesPosts: series.posts
    },
  };
}
