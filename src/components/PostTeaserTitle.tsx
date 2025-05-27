import React from "react";
import Link from "next/link";
import { formatPostPath, formatSeriesPostPath } from "utils/actions";

export default function PostTeaserTitle({ post }) {
  const { publishedAt, url, title, postType, series } = post;
  const renderStandalonePost = () => (
    <Link
      href="/post/[year]/[month]/[day]/[slug]"
      as={formatPostPath(publishedAt, url)}
      className="post-teaser__title text-3xl"
    >
      {title}
    </Link>
  )

  const renderSeriesPost = () => (
    <Link 
      href={`/series/[series-slug]/[slug]`} className="post-teaser__title text-3xl"
      as={formatSeriesPostPath(series.url, url)}
    >
      {title}
    </Link>
  );
  return (
    <div>
      {postType === "series" ? renderSeriesPost() : renderStandalonePost()}
    </div>
  )
}
