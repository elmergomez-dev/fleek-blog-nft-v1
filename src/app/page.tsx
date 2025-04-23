import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { client } from '../../tina/__generated__/client'; // NOTE: Path adjusted (only up 2 levels from src/app/)
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Adjust path if needed

export default async function Home() { // Changed function name to Home and made async
  // --- Pasted data fetching logic ---
  const postsListData = await client.queries.postConnection();
  const posts = postsListData.data?.postConnection?.edges;
  // --- End of pasted logic ---

  // --- Pasted return statement ---
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Web3 Journey: AI Art, Ethereum Blockchain, and NFTs</h1>
      <div className={styles.homeSlogan}>Exploring the intersection of Web3, Ethereum, and AI-generated art. Join me on my journey learning blockchain tech and minting creative NFTs.</div>
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((postEdge) => {
            if (!postEdge?.node?._sys) return null;
            const { title, date, excerpt, featuredImage, _sys } = postEdge.node;
            const slug = _sys.filename.replace(/\.md$/, '');
            const postDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined;

            return (
              <Link href={`/blog/${slug}`} key={_sys.filename} passHref legacyBehavior={false}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden">
                  {featuredImage && (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={featuredImage}
                        alt={title || 'Blog post image'}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{title || 'Untitled Post'}</CardTitle>
                    {postDate && (
                      <CardDescription>
                         {postDate}
                      </CardDescription>
                    )}
                  </CardHeader>
                  {excerpt && (
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {excerpt}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No posts found yet.</p>
      )}
    </div>
  );
  // --- End of pasted return statement ---
}