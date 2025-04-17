import React from "react";
import Link from "next/link";

const TagList = ({ tags }) => {
  return (
    <div className="flex items-center">
      <p className="font-bebas text-xl mr-2">Tags</p>
      {tags.map((tag) => (
        <Link
          className="border rounded py-1 px-2"
          href={{
            pathname: "/search",
            query: { type: "tagged", query: tag.name.toLowerCase() },
          }}
          key={`tag-${tag.name.split(" ").join("-").toLowerCase()}`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
