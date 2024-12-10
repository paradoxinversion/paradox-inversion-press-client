import { DocumentRenderer } from "@keystone-6/document-renderer";
import { getAllPosts, getPost, getPostPathParts } from "utils/actions";

export default function Page(props) {
  return (
    <div>
      <h1 className="pi-header--text">{props.post.title}</h1>
      <DocumentRenderer document={props.post.content.document} />
    </div>
  );
}
export async function getStaticPaths() {
  const res = await getAllPosts();
  const paths = res.map((post) => {
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
  return { paths, fallback: true };
}

export async function getStaticProps(ctx) {
  const res = await getPost(ctx.params.slug);
  console.log(res.post);
  return {
    props: {
      post: res.post,
    },
  };
}
