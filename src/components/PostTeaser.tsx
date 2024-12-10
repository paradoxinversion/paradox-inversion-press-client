import PostTeaserBody from "./PostTeaserBody";
import PostTeaserTitle from "./PostTeaserTitle";

export default function PostTeaser({ post }) {
  const { brief } = post;
  return (
    <div className="rounded mb-4">
      <PostTeaserTitle post={post} />
      <PostTeaserBody brief={brief} />
      {/* <PostTeaserLink post={post} /> */}
    </div>
  );
}
