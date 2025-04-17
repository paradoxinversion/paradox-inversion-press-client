import React from "react";
import PropTypes from "prop-types";
const PostTeaserListHeader = (props) => {
  return (
    <React.Fragment>
      {props.customHeaderText ? (
        <div className="text-center sm:text-left">
          <p className="barcode barcode--large text-red-800">I see you.</p>
          <p className="post-teaser--header--text">Latest Posts</p>
        </div>
      ) : (
        <p>
          {props.searchType === "page"
            ? `Recent Posts`
            : props.searchType === "category"
            ? `Recent Posts in ${props.query}`
            : props.searchType === "series"
            ? `Recent posts in this series`
            : `Recent Posts tagged ${props.query}`}
        </p>
      )}
    </React.Fragment>
  );
};

export default PostTeaserListHeader;
