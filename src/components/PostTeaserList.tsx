import PostTeaser from "./PostTeaser";
import PostTeaserListHeader from "./PostTeaserListHeader";

export default function PostTeaserList({ posts }) {
  return (
    <div>
      <PostTeaserListHeader
        customHeaderText={"foo"}
        // query={props.query}
      />
      {posts.map((post) => (
        <PostTeaser key={post.id} post={post} />
      ))}
    </div>
  );
}
