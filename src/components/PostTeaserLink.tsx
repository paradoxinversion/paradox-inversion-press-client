import React from "react";
import Link from "next/link";
import { formatPostPath, formatSeriesPostPath } from "utils/actions";

const PostTeaserLink = ({ post }) => {
  const { publishedAt, url, postType, series } = post;
  const renderStandalonePost = () => (
    <Link
      href="/post/[year]/[month]/[day]/[slug]"
      as={formatPostPath(publishedAt, url)}
      className="post-teaser__title"
    >
      Read It
    </Link>
  );

  const renderSeriesPost = () => (
    <Link 
      className="post-teaser__title"
      href={`/series/[series-slug]/[slug]`}
      as={formatSeriesPostPath(series.url, url)} 
    >
      Read It
    </Link>
  );

  return (
    <div className="post-teaser">
      {postType === "series" ? renderSeriesPost() : renderStandalonePost()}
    </div>
  );
};

export default PostTeaserLink;
