import PostTeaser from "./PostTeaser";

export default function PostTeaserList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <PostTeaser key={post.id} post={post} />
      ))}
    </div>
  );
}
