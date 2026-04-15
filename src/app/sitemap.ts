import { MetadataRoute } from "next";
import { getAllPosts } from "@/app/lib/api";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.knowledge-matchmaker.qual.is";
  const posts = getAllPosts();

  const mostRecentPost = posts[0];
  const mostRecentPostDate = mostRecentPost
    ? new Date(mostRecentPost.date)
    : new Date();

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.lastModified ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const routes = [
    {
      url: baseUrl,
      lastModified: mostRecentPostDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/svo`,
      lastModified: mostRecentPostDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...postEntries,
  ];

  return routes;
}
