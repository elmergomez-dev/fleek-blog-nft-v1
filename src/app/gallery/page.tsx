// src/app/gallery/page.tsx
import React from 'react';
import NftCard from '@/components/NftCard'; // Adjust import path if needed
import type { NftType } from '@/types'; // Adjust import path if needed
import styles from './gallery.module.css';

// --- Metadata ---
export const metadata = {
  title: 'NFT Gallery | My Web3 & AI Art Journey',
  description: 'A gallery showcasing AI-generated art NFTs from my collection.',
};

// --- Data Fetching (Server Component) ---
// Fetches NFTs for a given owner address using Alchemy API
async function getNftsForOwner(ownerAddress: string): Promise<NftType[]> {
  // ... (Keep the existing getNftsForOwner function exactly as it was in the previous step)
  // ... (Including API key check, fetch call, error handling, mapping)
    const apiKey = process.env.ALCHEMY_API_KEY;
    // Adding console log again just for clarity during debugging phase
    console.log('--- Checking API Key in Gallery Fetch ---:', apiKey ? `Loaded (length ${apiKey.length})` : '!!! NOT LOADED !!!');
    const network = "eth-mainnet";

    if (!apiKey) { /* ... error handling ... */ return []; }
    if (!ownerAddress) { /* ... error handling ... */ return []; }

    const url = `https://${network}.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${ownerAddress}&withMetadata=true&pageSize=100`;
    console.log('Attempting to fetch:', url);

    try {
      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (!response.ok) { /* ... error handling ... */ throw new Error(`Failed to fetch NFTs: ${response.status}`); }
      const data = await response.json();
      const nfts: NftType[] = data.ownedNfts.map((nft: any) => { /* ... mapping logic ... */
          const getImageUrl = (image: any): string | undefined => { if (!image) return undefined; return image.cachedUrl || image.thumbnailUrl || image.pngUrl || image.imageUrl || image.originalUrl; }
          const contractAddress = nft.contract?.address;
          const tokenId = nft.tokenId;
          if (!contractAddress || !tokenId) { console.warn("Skipping NFT due to missing contract address or token ID:", nft); return null; }
          return { id: `${contractAddress}/${tokenId}`, name: nft.name || `#${tokenId}`, imageUrl: getImageUrl(nft.image), contractAddress: contractAddress, tokenId: tokenId, description: nft.description || '', collectionName: nft.contract?.name || nft.contract?.openSeaMetadata?.collectionName || '', tokenType: nft.tokenType, openseaUrl: `https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}` };
      }).filter((nft): nft is NftType => nft !== null && !!nft.imageUrl);
      console.log(`Found ${nfts.length} NFTs with images for ${ownerAddress}`);
      return nfts;
    } catch (error) { console.error("Error caught in getNftsForOwner fetch:", error); return []; }
}


// --- Page Component ---
export default async function GalleryPage() {
  const addressToDisplay = "vitalik.eth"; // Using vitalik.eth for testing
  const nfts = await getNftsForOwner(addressToDisplay);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center"> {/* Adjusted margin */}
        NFT Gallery Showcase
      </h1>

      {/* --- ADD THIS INTRODUCTORY TEXT --- */}
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
        <p className={styles.gallerySlogan}>
          This gallery is where I plan to showcase unique artworks created during my Web3 learning journey. These pieces will be <strong>generated using AI tools</strong> based on my ideas and then minted as NFTs on the blockchain.
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">
          As I&apos;m still honing my skills with both AI art generation and NFT minting, this space currently features a selection of NFTs owned by <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-1 rounded break-words">{addressToDisplay}</code> as a temporary placeholder and technical example. Follow along as I work towards populating this gallery with <strong>my own AI-assisted creations!</strong>
        </p>
      </div>
      {/* --- END INTRODUCTORY TEXT --- */}

      {/* You might want to remove or comment out this next line now, as the text above explains it */}
      {/* <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
        Displaying NFTs owned by {addressToDisplay}
      </p> */}

      {/* NFT Grid */}
      {nfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {nfts.map((nft) => (
            <NftCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No NFTs found for this address, or there was an error loading them. Check server console logs.
        </p>
      )}
    </div>
  );
}