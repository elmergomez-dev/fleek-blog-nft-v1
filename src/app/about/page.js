// app/about/page.js
import React from 'react';
import Link from 'next/link'; // Keep if using optional Links section below
import Image from 'next/image'; // Keep if using optional Image section below

// --- Metadata ---
// Define metadata specific to this page (title for browser tab, description for SEO)
export const metadata = {
  // Consider using the meta title we discussed earlier, specific to the About page
  title: 'About | My Journey into Web3, AI Art & NFTs',
  // Use the meta description we crafted for the About page
  description: 'Learn about my personal journey into Web3, focusing on Ethereum, AI-generated art, and minting NFTs. Discover the story behind the blog and my passion.',
};

// --- Page Component ---
// This is the default export, the React component for your About page
export default function AboutPage() {
  // Note: Removed the date/time variables from the render output as they aren't typical page content

  return (
    // Main container div with Tailwind classes for padding, max-width, and centering
    <div className="max-w-3xl mx-auto p-4 md:p-8">

      {/* Styled H1 with Tailwind classes */}
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        About This Journey
      </h1>

      {/* Horizontal Rule (Line Separator) with Tailwind classes */}
      <hr className="mb-6 md:mb-8 border-gray-300 dark:border-gray-700" />

      {/* --- Optional Image Section --- */}
      {/* Uncomment and modify this section if you want to add an image */}
      {/*
      <div className="mb-6 text-center">
        <Image
          src="/images/profile-pic.jpg" // IMPORTANT: Change to your image path in /public folder
          alt="Elgo profile picture"     // IMPORTANT: Change alt text
          width={150}
          height={150}
          className="rounded-full inline-block" // Tailwind classes for rounded image centered
        />
      </div>
      */}

      {/* --- Main Content Paragraphs with Tailwind classes --- */}
      <p className="mb-4 leading-relaxed"> {/* Added margin and line-height */}
        Welcome! You've landed at the digital crossroads where technology meets creativity – a space documenting my personal expedition into the fascinating world of Web3. I'm Elgo, and this blog chronicles my deep dive, particularly focusing on the groundbreaking potential of the <strong>Ethereum blockchain</strong> and my growing passion for <strong>AI-generated art</strong> brought to life as <strong>Non-Fungible Tokens (NFTs)</strong>.
      </p>
      <p className="mb-4 leading-relaxed"> {/* Added margin and line-height */}
        What started as curiosity about blockchain technology quickly evolved into a captivating journey. I was drawn to the core ideas of Web3 – decentralization, transparency, and digital ownership. Ethereum, with its robust <strong>smart contract</strong> capabilities and vibrant ecosystem, became my primary focus for learning and experimentation.
      </p>
      <p className="mb-4 leading-relaxed"> {/* Added margin and line-height */}
        Simultaneously, I found myself mesmerized by the incredible advancements in <strong>Artificial Intelligence</strong>... This intersection felt revolutionary...
      </p>
      <p className="mb-4 leading-relaxed"> {/* Added margin and line-height */}
        This blog is my open notebook, my digital canvas, and my learning log...
      </p>

       {/* Styled H2 with Tailwind classes */}
      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">
        What You'll Find Here
      </h2>

      {/* Styled List with Tailwind classes */}
      <ul className="list-disc list-inside mb-6 space-y-2 leading-relaxed"> {/* Added list style, spacing, line-height */}
        <li>My personal experiences and learning curves navigating the Ethereum ecosystem.</li>
        <li>Insights into the tools and techniques I use for generating AI art.</li>
        <li>Thoughts on the evolving NFT space, digital ownership, and the future of creativity on the blockchain.</li>
        <li>Showcases of AI art pieces I've created and minted.</li>
        <li>Tutorials or explanations of concepts I'm figuring out along the way.</li>
      </ul>

      <p className="mb-4 leading-relaxed"> {/* Added margin and line-height */}
        This isn't the journal of an expert, but rather that of an enthusiastic learner sharing the adventure in real-time... I invite you to join me.
      </p>
      <p className="leading-relaxed"> {/* Last paragraph might not need bottom margin */}
        Let's explore the code, the creativity, and the community shaping this exciting digital frontier together!
      </p>

      {/* --- Optional Links Section --- */}
      {/* Uncomment and modify this section if you want to add links */}
      {/*
      <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Connect / See My Work:</h3>
        <p>
          <Link href="https://twitter.com/your_handle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 mr-4">
            Twitter
          </Link>
          <Link href="https://opensea.io/your_collection" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
            My NFT Collection
          </Link>
          {/* Add other relevant links here */}
      {/* </p>
      </div>
      */}

    </div> /* End of main container div */
  );
} // End of AboutPage component