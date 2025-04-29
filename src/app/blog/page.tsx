// src/app/blog/page.tsx (NEW FILE or Replace)
import React from 'react';
import type { Metadata } from 'next';
// Adjust import paths if needed
import { getSortedPostsData, type PostListItem } from '@/lib/posts';
import BlogRoll from '@/components/BlogRoll'; // Import the shared component

// Metadata for the /blog page (Canonical)
export const metadata: Metadata = {
  // *** ACTION: Customize title and description ***
  title: 'Blog | My Web3 Journey - AI Art & NFTs',
  description: 'Follow my journey exploring Web3, AI-generated art, Ethereum, NFTs, and development challenges.',
  // No canonical needed here as this IS the canonical page
};

export default async function BlogIndexPage() {
  const allPostsData: PostListItem[] = getSortedPostsData();

  return (
    // Use container for consistent padding
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Specific title for this page */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-16 text-center">
         The Blog
      </h1>

      {/* Render the blog roll using the shared component */}
      <BlogRoll posts={allPostsData} />

    </div>
  );
}