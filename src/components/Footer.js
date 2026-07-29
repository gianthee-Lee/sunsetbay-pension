"use client";
import styles from './Footer.module.css';
import { usePensionData } from '@/utils/usePensionData';

export default function Footer() {
  const { data, isLoaded } = usePensionData();

  if (!isLoaded) return null;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerBrand} style={{ wordBreak: 'keep-all' }}>
          <h2 className={styles.footerLogo}>SUNSET<span className={styles.logoHighlight}>BAY</span></h2>
          <p>{data.footer.desc1}</p>
          <p>{data.footer.desc2}</p>
        </div>
        <div className={styles.footerInfo} style={{ wordBreak: 'keep-all' }}>
          <h3>Contact Us</h3>
          <p>📍 {data.footer.address}</p>
          <p>📞 예약문의: <span style={{ whiteSpace: 'nowrap' }}>{data.footer.phone}</span></p>
          <p>🕒 운영시간: <span style={{ wordBreak: 'keep-all' }}>{data.footer.hours}</span></p>
        </div>
        <div className={styles.footerSocial} style={{ wordBreak: 'keep-all' }}>
          <h3>Follow Us</h3>
          <div className={styles.socialLinks}>
            {data.footer.showBlog !== false && <a href={data.footer.blogLink || "https://blog.naver.com"} target="_blank" rel="noopener noreferrer">네이버 블로그</a>}
            {data.footer.showInstagram && <a href={data.footer.instagram} target="_blank" rel="noopener noreferrer">인스타그램</a>}
            {data.footer.showKakaotalk && <a href={data.footer.kakaotalk} target="_blank" rel="noopener noreferrer">카카오톡 상담</a>}
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Sunsetbay Pension. All rights reserved.</p>
      </div>
    </footer>
  );
}
