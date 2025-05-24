import React from "react";
import Link from "next/link";
import { getPostPathParts } from "utils/actions";

const PostTeaserLink = ({ post }) => {
  const { publishedAt, url, postType, series } = post;
  const [year, month, day] = getPostPathParts(publishedAt);
  const renderStandalonePost = () => (
    <Link
      href={`/post/${year}/${month}/${day}/${url}`}
      className="post-teaser__title"
    >
      Read It
    </Link>
  );

  const renderSeriesPost = () => (
    <Link href={`/series/${series.url}/${url}`} className="post-teaser__title">
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
