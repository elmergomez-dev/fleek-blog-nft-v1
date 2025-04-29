// src/app/blog/[slug]/page.tsx

import React from 'react'; // Technically optional in newer Next.js, but good practice
import Image from 'next/image';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import type { Metadata, ResolvingMetadata } from 'next';

// Adjust the import path based on your project structure
// It should point to the Tina client generated in tina/__generated__/client
import { client } from '../../../../tina/__generated__/client';

// --- Type Definition for Page Props ---
type Props = {
  params: { slug: string };
  // searchParams: { [key: string]: string | string[] | undefined }; // Uncomment if using searchParams
};

// --- Metadata Generation (for SEO) ---
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata // Optional access to parent metadata
): Promise<Metadata> {
  try {
    const slug = params.slug;
    // Fetch post data needed for metadata
    // Ensure your Tina query 'post' includes title, excerpt (if you add it), featuredImage
    const result = await client.queries.post({
      relativePath: `${slug}.md`,
    });
    const post = result.data.post;

    // Handle post not found
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'This blog post could not be located.',
      };
    }

    // --- Construct Title (Keep under ~60 characters) ---
    const pageTitle = `${post.title || 'Blog Post'} | My Web3 Journey`;

    // --- Construct Description (Keep ~150-160 characters) ---
    // Ideal: Add an 'excerpt' field (type: string) to your TinaCMS 'post' schema
    //        in tina/config.ts and fill it out for each post.
    let pageDescription = post.excerpt;
    if (!pageDescription) {
      // Fallback if no excerpt field exists - customize this default message
      pageDescription = `Read the post titled "${post.title}" on my Web3 journey, covering AI art, NFTs, development challenges, and more.`;
    }
    // Ensure length constraint
    pageDescription = pageDescription.substring(0, 160);

    // --- Optional: Open Graph / Twitter Card data ---
    // *** ACTION NEEDED: Add a default OG image at /public/default-og-image.png (or similar path) ***
    const ogImageUrl = post.featuredImage || '/default-og-image.png';

    return {
      title: pageTitle,
      description: pageDescription,
      // Recommended for social sharing:
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        images: ogImageUrl ? [{ url: ogImageUrl }] : [], // Uses featuredImage or default
        type: 'article',
        url: `/blog/${slug}`, // Optional: Sets the canonical URL for the post
      },
      twitter: { // Optional: Specific card type for Twitter
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: ogImageUrl ? [ogImageUrl] : [],
      },
      // Optional: Add relevant keywords
      // keywords: ['Next.js', 'Fleek', 'Web3', 'Blog Setup', 'Troubleshooting', 'AI Art', 'NFT'],
    };

  } catch (error) {
    console.error(`Error generating metadata for slug ${params.slug}:`, error);
    // Return minimal metadata on error
    return {
      title: "Error Generating Metadata",
      description: "Could not generate metadata for this post.",
    };
  }
}

// --- Static Param Generation (for Static Site Generation) ---
export async function generateStaticParams() {
  try {
    const pages = await client.queries.postConnection(); // Assumes query name is 'postConnection'
    const paths = pages.data?.postConnection?.edges?.map((edge) => {
      // Added checks for null/undefined intermediate properties
      if (!edge?.node?._sys?.filename) {
        console.warn("Skipping path generation for edge with missing node or filename:", edge);
        return null;
      }
      return {
        slug: edge.node._sys.filename.replace(/\.md$/, ''),
      };
    }).filter((path): path is { slug: string } => path !== null); // Type guard for filtering nulls

    return paths || [];
  } catch (error) {
      console.error("Error generating static params:", error);
      return []; // Return empty array on error
  }
}

// --- Page Component ---
export default async function PostPage({ params }: Props) {
  try {
    // Fetch full post data using the slug
    const result = await client.queries.post({
      relativePath: `${params.slug}.md`,
    });
    const post = result.data.post;

    // Handle cases where the post might not be found
    if (!post) {
      // Consider using Next.js notFound() function here for proper 404 handling in production
      // import { notFound } from 'next/navigation';
      // notFound();
      return <div>Post not found!</div>; // Fallback display
    }

    // Safely format the date
    let postDate = 'No date available';
    if (post.date) {
        try {
            // Use specific locale and options for consistent formatting
            postDate = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC', // Specify timezone if date string doesn't include it
            });
        } catch (dateError) {
            console.error("Error formatting date:", dateError);
            // Keep 'No date available' or handle differently
        }
    }

    return (
      // Main article container with Tailwind classes
      <article className="max-w-3xl mx-auto my-8 px-4"> {/* Centered, padding, margin */}

        {/* Post Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title || 'Untitled Post'}</h1>
        {/* Post Date */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{postDate}</p>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.featuredImage}
              alt={post.title || 'Featured Image'} // Use post title for alt text
              fill
              style={{ objectFit: 'cover' }} // Cover the area
              priority // Prioritize loading for LCP
              sizes="(max-width: 768px) 100vw, 800px" // Provide sizes hint based on max-w-3xl
            />
          </div>
        )}

        {/* Main Body Content - Rendered using TinaMarkdown */}
        {/* Added prose styles for Markdown formatting */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Removed the components prop as discussed */}
          <TinaMarkdown content={post.body as TinaMarkdownContent} />
        </div>

      </article>
    );
  } catch (error) {
      console.error(`Error fetching post for slug ${params.slug}:`, error);
      // Render a user-friendly error message or use Next.js error handling
      return <div className="text-center my-10">Error loading post. Please try again later.</div>;
  }
}