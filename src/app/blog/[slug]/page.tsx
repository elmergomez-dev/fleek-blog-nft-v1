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

  return (
    <article className="max-w-3xl mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Date: {postDate}</p>
      <hr />
      {/* Render the rich text body using TinaMarkdown */}
      <div className="prose prose-lg dark:prose-invert max-w-none"> {/* Optional: Add styling classes here if needed */}
        <TinaMarkdown content={post.body} />
      </div>
    </article>
  );
}