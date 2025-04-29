// src/components/PostCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Adjust path if your types file is elsewhere (e.g., @/types)
import type { PostFrontmatter } from '@/types/index';

interface PostCardProps {
  slug: string;
  frontmatter: PostFrontmatter;
}

// Define your placeholder image path
const PLACEHOLDER_IMG = '/images/nft-placeholder.png'; // Make sure this file exists in /public/images

export default function PostCard({ slug, frontmatter }: PostCardProps) {
  // Use placeholder if featuredImage is missing in frontmatter
  const imageUrl = frontmatter.featuredImage || PLACEHOLDER_IMG;
  const postUrl = `/blog/${slug}`;

  // Format date for display (short format for card)
  let displayDate = 'No date';
  if (frontmatter.date) {
    try {
      displayDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
      });
    } catch (e) { /* ignore invalid date */ }
  }

  return (
    // Wrap the entire card in a link
    <Link href={postUrl} className="block group overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full aspect-video"> {/* 16:9 aspect ratio */}
          <Image
            src={imageUrl}
            alt={frontmatter.title || 'Blog post featured image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={(e) => { console.warn(`Failed image: ${imageUrl}`); e.currentTarget.srcset = PLACEHOLDER_IMG; e.currentTarget.src = PLACEHOLDER_IMG; }}
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out" // Zoom effect
          />
        </div>

        {/* Text Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-1 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {frontmatter.title || 'Untitled Post'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase">
            {displayDate}
          </p>
          {frontmatter.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3 flex-grow"> {/* Limit excerpt */}
              {frontmatter.excerpt}
            </p>
          )}
          {!frontmatter.excerpt && <div className="flex-grow mb-3"></div>} {/* Fallback space */}
          <div className="mt-auto text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
            Read more →
          </div>
        </div>
      </div>
    </Link>
  );
}