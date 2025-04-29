// src/app/blog/[slug]/page.tsx (Updated for Next.js 15 Async Props)

import React from 'react';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation'; // Import for handling 404
import fs from 'fs'; // Node.js file system module
import path from 'path'; // Node.js path module
import matter from 'gray-matter'; // Library to parse frontmatter
import { remark } from 'remark'; // Core Markdown processor
import html from 'remark-html'; // Plugin to convert Markdown to HTML

// --- Type Definitions (Updated for Next.js 15) ---
type Props = {
  params: Promise<{ slug: string }>; // <-- Updated: params is a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // <-- Updated: searchParams is also a Promise
};

// Define the expected structure of your Markdown frontmatter
interface PostFrontmatter {
  title: string;
  date: string; // Keep as string initially, parse later
  featuredImage?: string;
  excerpt?: string;
  // Add any other fields you use in your frontmatter
}

interface PostData {
  slug: string;
  frontmatter: PostFrontmatter;
  contentHtml: string; // The processed HTML body
}

// --- Helper Functions ---

// Define the path to your posts directory
const postsDirectory = path.join(process.cwd(), 'content/posts');

// Function to get data for a single post (remains the same)
async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    if (!fs.existsSync(fullPath)) {
      console.warn(`Markdown file not found for slug: ${slug}`);
      return null; // Return null if file doesn't exist
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html) // Use the remark-html plugin
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and contentHtml
    return {
      slug,
      frontmatter: matterResult.data as PostFrontmatter, // Assert type
      contentHtml,
    };
  } catch (error) {
    console.error(`Error reading or parsing markdown file for slug ${slug}:`, error);
    return null; // Return null on error
  }
}

// --- Metadata Generation (Updated for Next.js 15) ---
export async function generateMetadata(
  { params }: Props, // Props type now correctly includes Promise
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params Promise to get the actual object
  const awaitedParams = await params;
  const slug = awaitedParams.slug; // Use the resolved slug

  // Fetch data using the resolved slug
  const postData = await getPostData(slug);

  if (!postData) {
    return { title: 'Post Not Found' };
  }

  const { frontmatter } = postData;

  const pageTitle = `${frontmatter.title || 'Blog Post'} | My Web3 Journey`;
  let pageDescription = frontmatter.excerpt;
  if (!pageDescription) {
    pageDescription = `Read the post titled "${frontmatter.title}" on my Web3 journey...`; // Customize default
  }
  pageDescription = pageDescription.substring(0, 160);
  const ogImageUrl = frontmatter.featuredImage || '/default-og-image.jpg'; // Add default OG image

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
      type: 'article',
      url: `/blog/${slug}`, // Use the resolved slug here too
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

// --- Static Param Generation (remains the same) ---
export async function generateStaticParams() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    // Filter for actual markdown files
    const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));
    // Create slugs
    const paths = mdFiles.map((fileName) => ({
      slug: fileName.replace(/\.md$/, ''),
    }));
    return paths;
  } catch (error) {
    console.error("Error reading posts directory for static params:", error);
    return [];
  }
}

// --- Page Component (Updated for Next.js 15) ---
export default async function PostPage({ params, searchParams }: Props) { // Destructure searchParams too
  // Await the params Promise to get the actual object
  const awaitedParams = await params;
  const slug = awaitedParams.slug; // Use the resolved slug

  // If you ever needed searchParams:
  // const awaitedSearchParams = await searchParams;

  // Fetch data using the resolved slug
  const postData = await getPostData(slug);

  // Handle post not found using Next.js notFound()
  if (!postData) {
    notFound();
  }

  const { frontmatter, contentHtml } = postData;

  // Safely format the date (remains the same)
  let postDate = 'No date available';
  if (frontmatter.date) {
      try {
          postDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC', // Assume UTC if timezone not specified in frontmatter
          });
      } catch (dateError) {
          console.error("Error formatting date:", dateError);
      }
  }

  return (
    // Main article container
    <article className="max-w-3xl mx-auto my-8 px-4">

      {/* Post Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{frontmatter.title || 'Untitled Post'}</h1>
      {/* Post Date */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{postDate}</p>

      {/* Featured Image */}
      {frontmatter.featuredImage && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={frontmatter.featuredImage}
            alt={frontmatter.title || 'Featured Image'}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      {/* Main Body Content - Rendered from HTML string */}
      {/* Apply prose styles for Markdown formatting */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }} // <-- Render HTML here
      />

    </article>
  );
}