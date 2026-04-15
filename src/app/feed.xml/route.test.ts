import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./route";

const mockPosts = [
  {
    slug: "first-post",
    title: "First Post",
    date: "2026-01-15",
    excerpt: "This is the first post",
    author: { name: "SVO", picture: "/assets/blog/authors/svo.png" },
    coverImage: "/assets/blog/categories/think.png",
    topic: "think",
    ogImage: { url: "/assets/blog/categories/think.png" },
    content: "Content here",
  },
  {
    slug: "second-post",
    title: "Second Post & More",
    date: "2026-01-10",
    excerpt: 'Excerpt with "quotes" & <tags>',
    author: { name: "SVO", picture: "/assets/blog/authors/svo.png" },
    coverImage: "/assets/blog/categories/engineer.png",
    topic: "engineer",
    ogImage: { url: "/assets/blog/categories/engineer.png" },
    content: "Content here",
  },
];

vi.mock("@/app/lib/api", () => ({
  getAllPosts: vi.fn(() => mockPosts),
}));

describe("RSS Feed Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a valid RSS XML response", async () => {
    const response = GET();

    expect(response.headers.get("Content-Type")).toBe(
      "application/rss+xml; charset=utf-8"
    );
  });

  it("should include channel metadata", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("<title>Engineering Leadership");
    expect(body).toContain(
      "<link>https://www.knowledge-matchmaker.qual.is</link>"
    );
    expect(body).toContain('version="2.0"');
  });

  it("should include all posts as items", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("<title>First Post</title>");
    expect(body).toContain("<title>Second Post &amp; More</title>");
  });

  it("should include post links with correct URLs", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain(
      "<link>https://www.knowledge-matchmaker.qual.is/posts/first-post</link>"
    );
    expect(body).toContain(
      "<link>https://www.knowledge-matchmaker.qual.is/posts/second-post</link>"
    );
  });

  it("should escape XML special characters in excerpts", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("&quot;quotes&quot;");
    expect(body).toContain("&lt;tags&gt;");
  });

  it("should include pubDate for each item", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("<pubDate>");
    expect(body).toContain("2026");
  });

  it("should include guid with isPermaLink for each item", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain(
      '<guid isPermaLink="true">https://www.knowledge-matchmaker.qual.is/posts/first-post</guid>'
    );
  });

  it("should include atom self link", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain(
      'href="https://www.knowledge-matchmaker.qual.is/feed.xml" rel="self" type="application/rss+xml"'
    );
  });
});
