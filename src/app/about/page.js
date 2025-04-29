// app/about/page.js - CORRECTED
import React from 'react';
import Link from 'next/link'; // Keep if using optional Links section below
import Image from 'next/image'; // Keep if using optional Image section below

// --- Metadata ---
export const metadata = {
  title: 'About | My Journey into Web3, AI Art & NFTs',
  description: 'Learn about my personal journey into Web3, focusing on Ethereum, AI-generated art, and minting NFTs. Discover the story behind the blog and my passion.',
};

// --- Page Component ---
export default function AboutPage() {

  return (
    // Main container div with Tailwind classes
    <div className="max-w-3xl mx-auto p-4 md:p-8">

      {/* Styled H1 */}
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        About This Journey
      </h1>

      {/* HR Separator */}
      <hr className="mb-6 md:mb-8 border-gray-300 dark:border-gray-700" />

      {/* --- Optional Image Section --- */}
      {/*
      <div className="mb-6 text-center">
        <Image
          src="/images/profile-pic.jpg" // IMPORTANT: Change path
          alt="Elgo profile picture"     // IMPORTANT: Change alt text
          width={150}
          height={150}
          className="rounded-full inline-block"
        />
      </div>
      */}

      {/* --- Main Content Paragraphs with corrections --- */}
      <p className="mb-4 leading-relaxed">
        Welcome! You&rsquo;ve landed at the digital crossroads where technology meets creativity—a space documenting my personal expedition into the fascinating world of Web3. I&rsquo;m Elgo, and this blog chronicles my deep dive, particularly focusing on the groundbreaking potential of the <strong>Ethereum blockchain</strong> and my growing passion for <strong>AI-generated art</strong> brought to life as <strong>Non-Fungible Tokens (NFTs)</strong>.
      </p>
      <p className="mb-4 leading-relaxed">
        What started as curiosity about blockchain technology quickly evolved into a captivating journey. I was drawn to the core ideas of Web3—decentralization, transparency, and digital ownership. Ethereum, with its powerful smart contract capabilities and vibrant ecosystem, became my primary focus for learning and experimentation.
      </p>
      <p className="mb-4 leading-relaxed">
        Simultaneously, I found myself mesmerized by the incredible advancements in Artificial Intelligence... This intersection felt revolutionary... {/* Assuming no apostrophes here, check your actual text if error persists */}
      </p>
      <p className="mb-4 leading-relaxed">
        This blog is my open notebook, my digital canvas, and my learning log... {/* Assuming no apostrophes here, check your actual text if error persists */}
      </p>

       {/* Styled H2 with correction */}
      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">
        What You&rsquo;ll Find Here {/* Corrected You'll */}
      </h2>

      {/* Styled List */}
      <ul className="list-disc list-inside mb-6 space-y-2 leading-relaxed">
        <li>My personal experiences and learning curves navigating the Ethereum ecosystem.</li>
        <li>Insights into the tools and techniques I use for generating AI art.</li>
        <li>Thoughts on the evolving NFT space, digital ownership, and the future of creativity on the blockchain.</li>
        <li>Showcases of AI art pieces I&rsquo;ve created and minted. {/* Corrected I've */}</li>
        <li>Tutorials or explanations of concepts I&rsquo;m figuring out along the way. {/* Corrected I'm */}</li>
      </ul>

      <p className="mb-4 leading-relaxed">
        This isn&rsquo;t the journal of an expert, but rather that of an enthusiastic learner sharing the adventure in real-time... I invite you to join me. {/* Corrected isn't */}
      </p>
      <p className="leading-relaxed">
        Let&rsquo;s explore the code, the creativity, and the community shaping this exciting digital frontier together! {/* Corrected Let's */}
      </p>

      {/* --- Optional Links Section --- */}
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
        </p>
      </div>
      */}

    </div> /* End of main container div */
  );
} // End of AboutPage component