import { fetchGraphQL } from "../graphql";
import axiosInstance from "./axiosInstance";

/**
 * Get all pages. The user will only see pages that are not
 * 'published' if they are logged in due to access control.
 */
export const getPages = async (build?) => {
  const query = `
query Pages {
  pages {
    id
    url
    title
    showInNav
    url
    storyCollection {
      url
    }
  }
}
  `;
  const fetchedPages = await fetchGraphQL(query, undefined, build);
  return fetchedPages;
};

/**
 * Get a specific page by URL. If the page is not published and
 * the user is not logged in, will return undefined causing an
 * error
 * @param {String} slug - The slugified URL of the page
 */
export const getPage = async (slug, build?) => {
  const query = `
query Page($where: PageWhereUniqueInput!) {
  page(where: $where) {
    url
    title
    pageType
    content {
      document
    }
  }
}
  `;
  const vars = {
    where: {
      url: slug,
    },
  };
  const pages = await fetchGraphQL(query, vars, build);
  return pages;
};

export const getHomePage = async (build?) => {
  const query = `
query Page($where: PageWhereUniqueInput!) {
  page(where: $where) {
    id
    content {
      document
    }
    postSections
  }
}
  `;

  const vars = {
    where: {
      title: "Home",
    },
  };
  const homePage = await fetchGraphQL(query, vars, build);
  return homePage;
};
/**
 * Gets a single post if it's been published or the user
 * is logged in.
 * @param {*} slug - The slugified title of the post
 */
export const getPost = async (slug, build?) => {
  const query = `
query Post($where: PostWhereUniqueInput!) {
  post(where: $where) {
    title
    content {
      document
    }
    publishedAt
    tags {
      name
    }
    author {
      displayName
    }
    url
    postType
    seriesOrder
    series {
      url
      seriesPostsCount
    }

  }
}
  `;
  const vars = {
    where: {
      url: slug,
    },
  };
  const post = await fetchGraphQL(query, vars, build);
  return post;
};

/**
 * Gets posts depending on a search type and query--
 * This is for searching for posts associated with
 * pages, tags, categories, etc.
 * @param {*} searchType
 * @param {*} query
 */
export const queryPosts = async (searchType, query?, build?) => {
  // ! Need Category Search
  if (searchType === "all") {
    return await getAllPosts(build);
  }

  if (searchType === "tagged") {
    return await getTaggedPosts(query);
  }

  if (searchType === "page") {
    return await getPagePosts(query);
  }
};

export const getAllPosts = async (build?) => {
  const query = `
query Posts {
  posts {
    id
    title
    url
    publishedAt
    brief
    postType
    author {
      displayName
    }
    series {
      url
      seriesPostsCount
    }
  }
}
  `;

  const postData = await fetchGraphQL(query, undefined, build);

  return postData.posts;
};

/**
 * Gets pubblished posts associated with the tag matching
 * the search query.
 * @param {*} searchQuery - The tag to search
 */
export const getTaggedPosts = async (searchQuery) => {
  const query = `
  query {
    allTags(where:{ tag: "${searchQuery}" }) {
      id
      tag
      posts (where:{state: published}){
        id
        title
        brief
        publishDate
        url
      }
    }
  }
  `;
  const taggedPosts = await axiosInstance.post(`/admin/api`, { query });
  return taggedPosts.data.data.allTags[0].posts;
};

/**
 * Gets published posts associated with a page
 * @param {String} searchQuery - The page url slug
 */
export const getPagePosts = async (searchQuery) => {
  const query = `
  query {
    allPosts(where: { page: { url: "${searchQuery}" } }) {
      id
      title
      brief
      publishDate
      url
    }
  }
  `;
  const pagePosts = await axiosInstance.post(`/admin/api`, { query });
  return pagePosts.data.data.allPosts;
};

export const getSeries = async (slug) => {
  const query = `
  query {
    allSerials(where: {url: "${slug}"}){
      seriesPosts(orderBy: "seriesOrder"){
        id
        seriesOrder
        url
        publishDate
        title
      }
    }
  }
  `;
  const series = await axiosInstance.post("/admin/api", { query });
  return series.data.data.allSerials[0];
};

export const getSeriesPosts = async (slug, build?) => {
  const query = `
query SeriesPosts($where: PostWhereInput!) {
  posts(where: $where) {
    title
    publishedAt
    url
    seriesOrder
  }
}
  `;
  const vars = {
    where: {
      series: {
        url: { 
          equals: slug
        },
      }
    },
  };
  const fetchedSeries = await fetchGraphQL(query, vars, build);
  return fetchedSeries;
};

export const getPreviousSerialPartData = (serialPost, serialsArray) => {
  if (serialPost.seriesOrder !== 1) {
    const index = serialsArray.findIndex(
      (post) => post.seriesOrder == serialPost.seriesOrder
    );
    if (index > -1) {
      return serialsArray[index - 1];
    }
  }
};

export const getNextSerialPartData = (serialPost, serialsArray) => {
  if (serialPost.seriesOrder < serialsArray.length) {
    const index = serialsArray.findIndex(
      (post) => post.seriesOrder == serialPost.seriesOrder
    );
    if (index > -1) {
      return serialsArray[index + 1];
    }
  }
};

/**
 * Return an array of posts sorted by when they are published.
 * @param {Array} postArray
 * @returns {Array} Posts sorted by the time they were published
 */
export const sortPostsByDateTime = (postArray) => {
  return postArray.sort(
    (a, b) =>
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );
};

/**
 * Return an array of posts sorted by their series order number.
 * @param {Array} postArray
 * @returns {Array} Posts sorted by series order number
 */
export const sortPostBySeriesOrder = (postArray) => {
  return postArray.sort((a, b) => a.seriesOrder - b.seriesOrder);
};

/**
 * Returns a post endpoint using the date adn slug
 * @param {Date} postDate
 * @param {String} slug
 */
export const formatPostPath = (postDate, slug) => {
  const d = new Date(postDate);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `/post/${year}/${month}/${day}/${slug}`;
};

export const formatSeriesPostPath = (seriesSlug, postSlug) => {
  return `/series/${seriesSlug}/${postSlug}`;
};

/**
 * Returns the year, month, and day from a post's date
 * @param {*} postDate
 */
export const getPostPathParts = (postDate) => {
  const d = new Date(postDate);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return [year, month, day];
};

export const getPostUrl = (post) => {
  if (post.postType === "series") {
    return `/series/${post.url}`;
  } else {
    const [year, month, day] = getPostPathParts(post.publishedAt);
    return `/post/${year}/${month}/${day}/${post.url}`;
  }
}