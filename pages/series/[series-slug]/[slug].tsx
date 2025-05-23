import { DocumentRenderer } from "@keystone-6/document-renderer";
import { getAllPosts, getPost, getPostPathParts, getSeriesPosts } from "utils/actions";
import { DateTime } from "luxon";
import TagList from "@/components/TagList";
import SeriesStepper from "@/components/SeriesStepper";

/***
 * A page component that renders a series post.
 */
export default function Page(props) {
  return (
    <div>
      <h1 className="pi-header--text">{props.post.title}</h1>
      {props.post.author && <p>By {props.post.author.displayName}</p>}
      <p className="italic mb-4">
        {DateTime.fromISO(props.post.publishedAt).toLocaleString(
          DateTime.DATETIME_HUGE
        )}
      </p>
      <SeriesStepper seriesPosts={props.seriesPosts} seriesUrl={props.post.series.url} />
      <hr className="mb-4" />
      <div className="flex-grow flex flex-col lg:flex-row">
        <div className="pi-content flex-grow max-w-prose mx-auto">
          <DocumentRenderer document={props.post.content.document} />
        </div>
      </div>
      <hr className="my-4" />
      <footer id="post-footer" className="mb-4">
        <div>
          {/* TODO: make this link to category section search page */}
          {props.post.category && (
            <p className="font-bebas text-xl">
              Category: {props.post.category.name}
            </p>
          )}
          {!!props.post.tags.length && <TagList tags={props.post.tags} />}
        </div>
      </footer>
    </div>
  );
}
export async function getStaticPaths() {
  const allPosts = await getAllPosts();
  const paths = allPosts.map((post) => {
    const [year, month, day] = getPostPathParts(post.publishedAt);
    return {
      params: {
        slug: post.url,
        "series-slug": post.series?.url || "",
        year: year.toString(),
        month: month.toString(),
        day: day.toString(),
      },
    };
  });
  return { paths, fallback: true };
}

export async function getStaticProps(ctx) {
  const pagePost = await getPost(ctx.params.slug);
  const seriesPosts = await getSeriesPosts(pagePost.post.series?.url);
  console.log("seriesPosts", seriesPosts);
  return {
    props: {
      post: pagePost.post,
      seriesPosts: seriesPosts.posts || [],
    },
  };
}
