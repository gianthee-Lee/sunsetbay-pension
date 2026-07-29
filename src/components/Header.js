"use client";
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>SUNSET<span className={styles.logoHighlight}>BAY</span></span>
          </Link>
        </div>

        <button className={styles.hamburger} onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </button>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/rooms" className={styles.navLink} onClick={() => setIsOpen(false)}>객실안내</Link></li>
            <li><Link href="/facilities" className={styles.navLink} onClick={() => setIsOpen(false)}>부대시설</Link></li>
            <li><Link href="/location" className={styles.navLink} onClick={() => setIsOpen(false)}>오시는길</Link></li>
          </ul>
          <div className={styles.headerActionsMobile}>
            <Link href="/reservation" className="btn-primary" onClick={() => setIsOpen(false)}>
              예약문의
            </Link>
          </div>
        </nav>

        <div className={styles.headerActionsDesktop}>
          <Link href="/reservation" className="btn-primary">
            예약문의
          </Link>
        </div>
      </div>
    </header>
  );
}
