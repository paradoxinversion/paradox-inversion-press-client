import PostTeaser from "./PostTeaser";
import PostTeaserListHeader from "./PostTeaserListHeader";

export default function PostTeaserList({ posts }) {
  return (
    <div>
      <PostTeaserListHeader
        customHeaderText={"foo"}
      />
      {posts.sort((postA, postB) => (
        new Date(postA.publishedAt) > new Date(postB.publishedAt) ? -1 : 1
      )).map((post) => (
        <PostTeaser key={post.id} post={post} />
      ))}
    </div>
  );
}
