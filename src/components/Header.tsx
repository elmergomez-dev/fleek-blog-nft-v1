import Link from 'next/link';
import styles from './Header.module.css'; // We'll create this CSS file next

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          {/* You can add more menu items here later */}
        </ul>
      </nav>
    </header>
  );
}