import PostTeaser from "./PostTeaser";
import PostTeaserListHeader from "./PostTeaserListHeader";

export default function PostTeaserList({ posts }) {
  return (
    <div>
      <PostTeaserListHeader
        customHeaderText={"foo"}
      />
      {posts.sort((postA, postB) => (postA.publishedAt < postB.publishedAt) ? -1 : ((postA.publishedAt > postB.publishedAt) ? 1 : 0)).map((post) => (
        <PostTeaser key={post.id} post={post} />
      ))}
    </div>
  );
}
