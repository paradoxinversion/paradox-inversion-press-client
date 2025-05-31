import { DocumentRenderer } from "@keystone-6/document-renderer";
import { getAllPosts, getPost, getPostPathParts } from "utils/actions";
import { DateTime } from "luxon";
import TagList from "@/components/TagList";
import { GetStaticPathsResult } from "next";

/**
 * A page component that renders a standalone post.
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
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  try {

    const allPosts = await getAllPosts();
    const paths = allPosts.map((post) => {
      const [year, month, day] = getPostPathParts(post.publishedAt);
      return {
        params: {
          slug: post.url,
          year: year.toString(),
          month: month.toString(),
          day: day.toString(),
        },
      };
    });
    return { paths, fallback: false };
  } catch(e){
    console.error("Error fetching static paths:", e);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.slug;
  try {
    const pagePost = await getPost(slug);
    return {
      props: {
        post: pagePost.post,
      },
    };
  } catch (e) {
    console.error("Error fetching post:", e);
    return {
      props: {
        post: undefined,
        // Provide error details for debugging
        error: { name: (e as Error).name, message: (e as Error).message },
      },
    };
  }
}
