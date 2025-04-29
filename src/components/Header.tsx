import Link from 'next/link';
import styles from './Header.module.css';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function Header() {
  return (
    // Apply Tailwind classes directly for layout
    <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 py-3">
       {/* Flex container to space out nav and switcher */}
      <div className="flex justify-between items-center max-w-6xl mx-auto"> {/* Example container */}
        <nav>
          {/* Apply Tailwind classes directly to ul/li/a or use CSS Modules */}
          <ul className="flex items-center gap-6 md:gap-8"> {/* Adjusted gap */}
            <li>
              <Link href="/" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Gallery
              </Link>
            </li>
          </ul>
        </nav>

        <ThemeSwitcher /> {/* <<< Place the ThemeSwitcher component */}

       </div>
    </header>
  );
}