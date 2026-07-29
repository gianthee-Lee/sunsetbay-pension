"use client";
import styles from "./page.module.css";
import { usePensionData } from '@/utils/usePensionData';
import FadeInUp from '@/components/FadeInUp';

export default function LocationPage() {
  const { data, isLoaded } = usePensionData();

  if (!isLoaded) return <div style={{ minHeight: '100vh' }}></div>;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(data.location.mapQuery)}&output=embed`;

  return (
    <div className="container">
      <section className={styles.pageHero}>
        <span className="section-tag">Location</span>
        <h1 className="section-title">오시는 <span>길</span></h1>
        <p className="section-desc">포항 해안도로를 따라 편안하게 오실 수 있습니다.</p>
      </section>

      <div className={styles.wrap}>
        <FadeInUp>
          <div className={styles.mapWrap}>
            <iframe src={mapSrc} loading="lazy" title="오시는 길 지도" allowFullScreen></iframe>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className={styles.infoCard}>
            <h3>주소</h3>
            <div className="value">{data.location.address}</div>

            <h3>찾아오시는 방법</h3>
            <div className="value">{data.location.directions}</div>

            <h3>예약 문의</h3>
            <div className="value">{data.footer.phone}</div>

            <h3>체크인 / 체크아웃</h3>
            <div className="value" style={{ marginBottom: 0 }}>{data.reservation.checkin}</div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
