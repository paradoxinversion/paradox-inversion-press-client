import { DocumentRenderer } from "@keystone-6/document-renderer";
import { GetStaticPathsResult } from "next";
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

export async function getStaticPaths(): Promise<GetStaticPathsResult>  {
  try {
    const res = await getPages(true);
    const paths = res.pages.map((page) => ({
      params: { slug: page.url },
    }));
    return { paths, fallback: "blocking" };
  } catch(e){
    console.error("Error fetching static paths:", e);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.slug;
  try {
    const res = await getPage(slug, true);
    const series = await getSeriesPosts(slug, true);
    return {
      props: {
        title: res.page.title,
        content: res.page.content.document,
        pageType: res.page.pageType,
        seriesPosts: series.posts
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (e){
    return {
      props: {
        title: undefined,
        content: undefined,
        pageType: undefined,
        seriesPosts: undefined,
        // Provide error details for debugging
        error: { name: (e as Error).name, message: (e as Error).message },
      },
      revalidate: 60, // Revalidate every 60 seconds
    }
  }
}
