import PostTeaserList from "@/components/PostTeaserList";
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
        {props.content ? (
          <DocumentRenderer document={props.content} />
        ) : (
          <p className="text-center">Content not available</p>
        )}
      </div>
      <div>
        {props.pageType === "series" && props.seriesPosts && props.seriesPosts.length > 0 ? (
          <div className="pi-series-posts">
            <PostTeaserList posts={props.seriesPosts} />
          </div>) : null}
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
    return { paths, fallback: true };
  } catch(e){
    console.error("Error fetching static paths:", e);
    return { paths: [], fallback: true };
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
