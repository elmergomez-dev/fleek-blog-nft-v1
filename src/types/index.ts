// src/types/index.ts
export interface NftType {
    id: string; // e.g., contract/tokenId
    name?: string;
    imageUrl?: string;
    contractAddress: string;
    tokenId: string;
    description?: string;
    collectionName?: string;
    tokenType?: 'ERC721' | 'ERC1155';
    openseaUrl?: string; // Example marketplace link
    // Add other potential properties like traits if needed later
    // traits?: Array<{ trait_type: string; value: string }>;
  }

  // Type for Blog Post Frontmatter (used in Blog List/Pages)
// *** ACTION NEEDED: Adjust fields/types below to match YOUR markdown frontmatter ***
export interface PostFrontmatter {
  title: string;        // Required: Title of the post
  date: string;         // Required: Publication date (YYYY-MM-DD or ISO string format recommended)
  featuredImage?: string; // Optional: Path to image (e.g., /images/posts/my-image.jpg)
  excerpt?: string;      // Optional: Short summary
  tags?: string[];       // Optional: List of tags
  // Add any other fields you use, for example:
  // author?: string;
}