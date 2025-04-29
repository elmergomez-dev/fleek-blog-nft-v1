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