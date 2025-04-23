import Image from 'next/image';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from '../../../../tina/__generated__/client'; // Adjust path if needed
// You might need a component to render Markdown/Rich Text later
// import { TinaMarkdown } from 'tinacms/dist/rich-text';

// Corrected generateStaticParams from above...
export async function generateStaticParams() {
  const pages = await client.queries.postConnection();
  const paths = pages.data?.postConnection?.edges?.map((edge) => {
    if (!edge?.node?._sys?.filename) {
      return null;
    }
    return {
      slug: edge.node._sys.filename.replace(/\.md$/, ''),
    };
  }).filter(Boolean);

  return paths || [];
}

// Corrected PostPage component
export default async function PostPage({
  params,
}: {
  params: { slug: string }; // Changed from string[] to string
}) {
  // Fetch data using the corrected slug and relativePath
  const result = await client.queries.post({
    relativePath: `${params.slug}.md`,
  });

  // Extract the actual post data (check the structure from your query/Tina types)
  const post = result.data.post;

  // Handle cases where the post might not be found
  if (!post) {
    return <div>Post not found!</div>;
  }

  // Safely format the date
  const postDate = post.date ? new Date(post.date).toLocaleDateString() : 'No date available';

  // Inside the PostPage component in src/app/blog/[slug]/page.tsx

  return (
    // Add some padding and max-width for the article layout
    <article className="max-w-3xl mx-auto my-8 px-4">
      {/* Post Title and Date */}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">Date: {postDate}</p>

      {/* --- ADD IMAGE HERE --- */}
      {/* Conditionally render the featured image if it exists */}
      {post.featuredImage && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg"> {/* Added margin-bottom, rounded, shadow */}
          <Image
            src={post.featuredImage} // Use the fetched image path
            alt={post.title || 'Featured Image'} // Alt text
            fill // Use fill layout
            style={{ objectFit: 'cover' }} // Make image cover the area
            priority // Add priority=true if image is likely "Largest Contentful Paint" (LCP)
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes hint
          />
        </div>
      )}
      {/* --- END OF ADDED IMAGE --- */}

      {/* Optional Separator */}
      {/* <hr className="mb-8" /> */}

      {/* Apply prose styling to the body content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <TinaMarkdown content={post.body} />
      </div>
    </article>
  );
}