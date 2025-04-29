// src/components/NftCard.tsx (CORRECTED)
'use client' // <<< ADD THIS DIRECTIVE AT THE VERY TOP

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NftType } from '@/types'; // Adjust import path if needed

interface NftCardProps {
  nft: NftType;
}

// Path to your placeholder image inside the /public folder
const PLACEHOLDER_IMG = '/images/nft-placeholder.png'; // CHANGE if needed

export default function NftCard({ nft }: NftCardProps) {
  const imageUrl = nft.imageUrl || PLACEHOLDER_IMG;
  const displayName = nft.name || `Token #${nft.tokenId}`;
  const displayCollection = nft.collectionName || nft.contractAddress;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 flex flex-col">
      <Link href={nft.openseaUrl || '#'} target="_blank" rel="noopener noreferrer" aria-label={`View ${displayName} on OpenSea`}>
        <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700">
          <Image
            src={imageUrl}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
            // This onError prop is now allowed because NftCard is a Client Component
            onError={(e) => { console.warn(`Failed to load image: ${imageUrl}`); e.currentTarget.srcset = PLACEHOLDER_IMG; e.currentTarget.src = PLACEHOLDER_IMG; }}
            unoptimized={imageUrl.endsWith('.gif')}
            priority={false}
          />
        </div>
      </Link>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg truncate text-gray-900 dark:text-gray-100" title={displayName}>
            {displayName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate" title={displayCollection}>
            {displayCollection}
          </p>
        </div>
        <div className="mt-2">
           <Link href={nft.openseaUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            View on OpenSea
           </Link>
        </div>
      </div>
    </div>
  );
}