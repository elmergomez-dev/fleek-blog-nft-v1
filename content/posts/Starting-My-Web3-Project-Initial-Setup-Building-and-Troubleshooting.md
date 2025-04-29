---
title: 'Starting My Web3 Project: Initial Setup, Building, and Troubleshooting'
date: 2025-04-28T16:00:00.000Z
excerpt: >-
  Documenting my dive into Web3: Building the blog foundation and learning from
  early dev challenges.
featuredImage: /images/starting-my-web3-project.jpg
---

So, the journey begins! As a web developer always curious about the synergy between intellect and creativity, my curiosity about Web3 finally became irresistible. My motivation, really, was to dive deep into the world of AI-generated art and figure out how to give them life (i.e., mint them) on the Ethereum blockchain as NFTs. This blog will be my live feed for that exploration, documenting the process right from these initial steps—building the actual platform where these ideas will live. It feels like the perfect way to merge my technical web development background with a growing fascination for generative art.

What really pulled me in was the intersection of two things I genuinely enjoy: the technical challenge of web development and a personal inclination toward visual art. The idea of using cutting-edge tech like AI art generation and then giving those creations verifiable provenance and ownership on a blockchain (specifically Ethereum, which I'm focusing on) as NFTs… Well, that just sounded like an adventure I couldn't pass up. So, this blog is born out of that excitement. It's going to be my public journal and, hopefully, a place where fellow travelers on this journey can share insights. I'm coming into the deep Web3 part as a relative novice, but I'm bringing my existing web development skills to the table, hoping to bridge that gap.

Choosing the tools felt like laying the first bricks. I opted for familiar ground with Next.js and Tailwind CSS for the frontend build—powerful tools I already feel comfortable with for creating modern web experiences. However, to align with the Web3 spirit, I decided to try Fleek for deployment, aiming for decentralized hosting on IPFS (InterPlanetary File System). Setting up the initial project structure using create-next-app, tweaking the first few configurations, and planning the basic layout felt exciting, like mapping out a new territory with familiar compass readings. But as any coder can attest, the path from boilerplate to "it actually works consistently!" often involves navigating a few unexpected error messages and configuration quirks right from the start...

## Choosing the Tools: Setting Up the Foundation

First things first: building the actual blog site! As a developer, choosing the right tools felt important. I landed on:

* **Next.js (with App Router)**: A powerful React framework. It's modern, handles both server-side and client-side rendering brilliantly, and has great features for performance. Felt like the right choice for building a fast, scalable site.
* **Tailwind CSS**: For styling. I love utility-first CSS for rapidly building and customizing interfaces without writing tons of custom CSS files.
* **TinaCMS**: Okay, I haven't fully integrated this yet, but the plan is to use TinaCMS later for managing blog content more easily. It looked like a great Git-based CMS option. As a Git-based CMS, it works directly with the project's source code repository, which looked like a promising approach for keeping content version-controlled alongside the code.
* **Fleek**: For deployment. Since this is a Web3-focused project, I wanted to embrace decentralized hosting. Fleek deploys sites to IPFS, which felt philosophically aligned with the whole venture.

Getting started was familiar territory: create-next-app spun up the boilerplate. Then came the fun part—making it mine. The very first thing? That slightly embarrassing default browser tab title: "Create Next App." Had to change that immediately! A quick dive into Next.js metadata configuration in the layout.tsx file sorted that out.

![](/images/initial-homepage-in-light-mode.jpg)
*Initial homepage in light mode*

![](/images/initial-homepage-in-dark-mode.jpg)
*Initial homapage in dark mode*

Next up, a basic structure: a simple header with navigation links for "Home" and "About" initially (using Next.js's Link component for smooth client-side navigation) and setting up the global styles. I even managed to get a nice, subtle gray gradient background working using Tailwind CSS configurations in globals.css. I then replaced the "Home" link with "Blog," aptly serving as the "homepage," finally settling on "About," "Blog," and "Gallery" as the main menu. So far, so good!
![](/images/my-first-blog-post.jpg)
*My first blog post: Hello, World!*

## The First Taste of Web3 (and Web Dev) Realities: Errors!

Ah, the blissful initial setup phase—it never lasts! As I started adding more features (like preparing for an NFT gallery and implementing a dark mode toggle—more on those in future posts!), I hit my first real snags. And let me tell you, they were really… educational.

* **The Environment Variable Saga**: One absolute rule in web development is to never commit secrets (like API keys) directly into your code or Git repository. The standard practice is to use environment variables. I knew this, of course! So, when I needed an API key for a service (initially thinking ahead for the NFT gallery using Alchemy), I dutifully created a .env.local file and put my key there, accessing it in the code via process.env.MY\_KEY\_NAME. Simple, you might say?

  Wrong! My application started crashing with errors like Workspace failed or, digging deeper into the terminal logs, cryptic messages like Failed to load env from .env.local TypeError: Cannot read properties of undefined (reading 'split'). It turns out Next.js (and many Node.js tools) only loads .env files when the server starts. My mistake? Forgetting to stop and restart the npm run dev server after creating/editing the .env.local file! A classic facepalm moment, but a crucial lesson reinforced. I also learned the hard way that syntax inside the .env.local file matters—values with spaces or special characters often need double quotes (").
* **The Build & Deployment Gauntlet**: Getting things running locally is one thing; deploying live is another. My automatic deployments via Fleek started failing. Cue more detective work:
  * Linting Errors: I ran into react/no-unescaped-entities. The culprit? Using normal apostrophes (') in contractions like "I'm" or "isn't" within my About page text. Apparently, strict linting rules require escaping these with HTML entities (like ' or ’). Linting helps catch potential errors and enforce code style but sometimes feels a bit pedantic! Fixed that.
  * Type Errors: Then came a TypeScript error: Cannot find module 'next-themes/dist/types.' This happened after implementing the dark mode toggle. It turned out I had used an outdated method to import a specific type (ThemeProviderProps) for the library version I was using. Fixing the import path (import type { ... } from 'next-themes') resolved the issue. A reminder to always check library documentation carefully!
  * Git Errors: At one point, even committing the fixes failed with fatal: pathspec 'app/...' did not match any files. Why? Because my project uses an src directory, I forgot to include src/ in the path when using git add. Simple mistake, easily fixed, but another bump in the road.

## Small Victories & What's Next

After resolving those issues, seeing the build succeed and the deployment complete (despite ongoing issues with my ENS domain linking, which I plan to address and write about in a future post) felt like a huge win. The basic site structure is up, the styling is taking shape, and the dark mode toggle works!

This initial phase has been filled with excitement, learning, and the inevitable debugging that comes with development. It's humbling to be a novice again in certain areas, but thrilling to apply existing skills in a new context.

Next up, I'll be diving deeper into actually implementing the NFT gallery logic (now that the build errors are sorted!). And, crucially, starting my journey into generating AI art to populate it.

Thanks for joining me at the very beginning! Stick around if you're curious about AI art, NFTs, Ethereum, or just enjoy following along with someone learning publicly and probably making a few more mistakes along the way. Comments and shared experiences are always welcome!
