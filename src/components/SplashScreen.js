"use client";
import { useState, useEffect } from 'react';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenSplashPension');
    if (hasSeen) {
      setStage(2);
      return;
    }

    const timer1 = setTimeout(() => {
      setStage(1);
    }, 1500);

    const timer2 = setTimeout(() => {
      setStage(2);
      sessionStorage.setItem('hasSeenSplashPension', 'true');
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (stage === 2) return null;

  return (
    <div className={`${styles.splashContainer} ${stage === 1 ? styles.hiding : ''}`}>
      <div className={styles.logoText}>
        <span className={styles.sunset}>SUNSET</span>
        <span className={styles.bay}>BAY</span>
      </div>
    </div>
  );
}
