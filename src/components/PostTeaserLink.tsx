import React from "react";
import Link from "next/link";
import { getPostPathParts } from "utils/actions";

const PostTeaserLink = ({ post }) => {
  const { publishDate, url } = post;
  const [year, month, day] = getPostPathParts(publishDate);
  return (
    <Link
      href="/post/[year]/[month]/[day]/[slug]"
      as={`/post/${year}/${month}/${day}/${url}`}
      className="post-teaser__title"
    >
      Read It
    </Link>
  );
};

export default PostTeaserLink;
