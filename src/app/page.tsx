// src/app/page.tsx (Updated with Canonical)
import React from 'react';
import type { Metadata } from 'next';
// Adjust import paths if needed
import { getSortedPostsData, type PostListItem } from '@/lib/posts';
import BlogRoll from '@/components/BlogRoll';

// Metadata for the Homepage - points canonical to /blog
export const metadata: Metadata = {
  // *** ACTION: Customize title and description ***
  title: 'My Web3 Journey | AI Art, Ethereum Blockchain, and NFTs',
  description: 'Exploring the intersection of Web3, Ethereum, and AI-generated art. Join me on my journey learning blockchain tech and minting creative NFTs.',
  alternates: {
    canonical: '/blog', // <<< POINTS TO /blog as the canonical source
  },
};

export default async function HomePage() {
  const allPostsData: PostListItem[] = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Introductory Title and Subtitle */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
           My Web3 Journey: AI Art, Ethereum Blockchain, and NFTs
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
           Exploring the intersection of Web3, Ethereum, and AI-generated art. Join me on my journey learning blockchain tech and minting creative NFTs.
        </p>
      </div>

      {/* Render the blog roll using the shared component */}
      <BlogRoll posts={allPostsData} />

    </div>
  );
}