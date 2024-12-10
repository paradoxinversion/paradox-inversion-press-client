import React from "react";
import Link from "next/link";
import { getPostPathParts } from "utils/actions";

export default function PostTeaserTitle({ post }) {
  const { publishedAt, url, title } = post;
  const [year, month, day] = getPostPathParts(publishedAt);
  return (
    <Link
      href="/post/[year]/[month]/[day]/[slug]"
      as={`/post/${year}/${month}/${day}/${url}`}
      className="post-teaser__title text-3xl"
    >
      {title}
    </Link>
  );
}
