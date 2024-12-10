import { DocumentRenderer } from "@keystone-6/document-renderer";
import { getHomePage, getPages, queryPosts } from "../src/utils/actions";
import React, { useEffect } from "react";
import PostTeaserList from "@/components/PostTeaserList";

// Home Page
const Index = ({ content, posts }) => {
  return (
    <div>
      <DocumentRenderer document={content || []} />
      <PostTeaserList posts={posts} />
    </div>
  );
};
export async function getStaticProps() {
  const res = await getHomePage();
  const posts = await queryPosts("all");
  return {
    props: {
      content: res.page.content.document,
      posts,
    },
  };
}
export default Index;
