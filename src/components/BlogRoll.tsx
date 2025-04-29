// src/components/BlogRoll.tsx (NEW FILE or Replace if created differently before)
import React from 'react';
// Adjust import paths if needed
import type { PostListItem } from '@/lib/posts';
import PostCard from '@/components/PostCard';

interface BlogRollProps {
  posts: PostListItem[];
}

export default function BlogRoll({ posts }: BlogRollProps) {
  return (
    <> {/* Use Fragment to avoid adding extra div */}
      {posts.length > 0 ? (
        // Responsive grid layout
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map(({ slug, frontmatter }) => (
            // Render a PostCard for each item
            <PostCard key={slug} slug={slug} frontmatter={frontmatter} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No blog posts found yet. Stay tuned!
        </p>
      )}
    </>
  );
}