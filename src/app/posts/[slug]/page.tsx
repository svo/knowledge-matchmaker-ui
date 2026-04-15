import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostNavigation } from "@/app/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { PostNavigationComponent } from "@/app/_components/post-navigation";
import Script from "next/script";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const navigation = getPostNavigation(params.slug);
  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <article className="prose dark:prose-invert lg:prose-xl md:text-4xl items-center">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            topic={post.topic}
          />
          <div className="mt-6 pb-4 mb-4 border-b border-primary/10">
            <PostNavigationComponent navigation={navigation} />
          </div>
          <PostBody content={content} />
        </article>
        <div className="mb-6 mt-6">
          <PostNavigationComponent navigation={navigation} />
        </div>
        <Script id="blogpost-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            dateModified: post.lastModified ?? post.date,
            author: {
              "@type": "Person",
              name: post.author.name,
            },
            description: post.excerpt,
            image: post.coverImage,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.knowledge-matchmaker.qual.is/posts/${post.slug}`,
            },
            publisher: {
              "@type": "Organization",
              name: "Qualis",
              logo: {
                "@type": "ImageObject",
                url: "https://www.knowledge-matchmaker.qual.is/favicon/android-icon-192x192.png",
              },
            },
          })}
        </Script>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | The quality of quality`;
  const keywords = `${post.topic}, software development, engineering, tech leadership`;

  return {
    title,
    description: post.excerpt,
    keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      url: `https://www.knowledge-matchmaker.qual.is/posts/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author.name],
      tags: [
        post.topic,
        "software development",
        "engineering",
        "tech leadership",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://www.knowledge-matchmaker.qual.is/posts/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
