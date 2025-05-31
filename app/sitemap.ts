import { MetadataRoute } from 'next'
import { formatPostPath, formatSeriesPostPath, getAllPosts, getPages } from 'utils/actions'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {

    const pages = await getPages();
    const posts = await getAllPosts();
  
    const postsMap = posts.map((post) => {
      if (post.postType === 'series') {
        return {
          url: `${process.env.HOST_URL}${formatSeriesPostPath(post.series.url, post.url)}`,
        }
      }
      return {
        url: `${process.env.HOST_URL}${formatPostPath(post.publishedAt, post.url)}`,
      }
    })
    const pagesMap = pages.pages.map((page) => ({
      url: `${process.env.HOST_URL}/page/${page.url}`,
    }));
    return [...pagesMap, ...postsMap];
  } catch (e) {
    console.error("Error generating sitemap:", e);
    return [];
  }
}