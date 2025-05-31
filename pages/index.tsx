import { DocumentRenderer } from "@keystone-6/document-renderer";
import { getHomePage, queryPosts } from "../src/utils/actions";
import React from "react";
import PostTeaserList from "@/components/PostTeaserList";

// Home Page
const Index = ({ content, posts }) => {
  return (
    <div>
      <div className="mb-8 pi-content">
        <DocumentRenderer document={content || []} />
      </div>
      <PostTeaserList posts={posts} />
    </div>
  );
};
export async function getStaticProps() {
  try {
    const res = await getHomePage(true);
    const posts = await queryPosts("all", undefined, true);
    return {
      props: {
        content: res.page.content.document,
        posts,
      },
    };
  } catch (e) {
    console.error("Error fetching static props:", e);
    return {
      props: {
        content: undefined,
        posts: [],
        error: { name: (e as Error).name, message: (e as Error).message },
      },
    };
  }
}
export default Index;
