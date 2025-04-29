// src/lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
// Assuming your type is defined here, adjust import path if needed
import type { PostFrontmatter } from '@/types/index';

// Define the structure we want for items in the post list
export interface PostListItem {
  slug: string;
  frontmatter: PostFrontmatter;
}

// Define the path to your posts directory relative to the project root
const postsDirectory = path.join(process.cwd(), 'content/posts');

// Function to get all post data, sorted by date
export function getSortedPostsData(): PostListItem[] {
  try {
    // Get file names under /content/posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md')) // Only include markdown files
      .map((fileName): PostListItem | null => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        try {
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section (frontmatter)
            const matterResult = matter(fileContents);

            // Combine the data with the slug
            return {
              slug,
              frontmatter: matterResult.data as PostFrontmatter, // Assert the type
            };
        } catch (readError) {
            console.error(`Error reading or parsing markdown file ${fileName}:`, readError);
            return null; // Skip this file if error occurs
        }
      });

    // Filter out any posts that had errors during reading/parsing
    const validPosts = allPostsData.filter((post): post is PostListItem => post !== null);

    // Sort posts by date (newest first)
    return validPosts.sort((a, b) => {
      // Handle cases where date might be missing or invalid gracefully
      const dateA = a.frontmatter.date ? new Date(a.frontmatter.date) : new Date(0);
      const dateB = b.frontmatter.date ? new Date(b.frontmatter.date) : new Date(0);
      // Compare getTime() for reliable date comparison
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
      console.error("Error reading posts directory:", error);
      return []; // Return empty array if the directory can't be read
  }
}