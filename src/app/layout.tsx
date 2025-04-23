import './globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Web3 Journey: AI Art, Ethereum Blockchain, and NFTs',
  description: 'Exploring the intersection of Web3, Ethereum, and AI-generated art. Join me on my journey learning blockchain tech and minting creative NFTs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
      <Header /> {/* <<< Add your Header component here */}
      <main>{children}</main> {/* The content of your pages will be rendered here */}
      {/* You could add a Footer component here later too */}
    </body>
    </html>
  )
}
