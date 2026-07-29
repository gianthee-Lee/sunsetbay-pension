"use client";
import styles from "./page.module.css";
import { usePensionData } from '@/utils/usePensionData';
import FadeInUp from '@/components/FadeInUp';

export default function Facilities() {
  const { data, isLoaded } = usePensionData();

  if (!isLoaded) return <div style={{ minHeight: '100vh' }}></div>;

  return (
    <div className="container">
      <section className={styles.pageHero}>
        <span className="section-tag">Facilities</span>
        <h1 className="section-title">부대 <span>시설</span></h1>
        <p className="section-desc">투숙 기간 동안 편하게 이용하실 수 있는 다양한 공용 시설을 소개합니다.</p>
      </section>

      <div className={styles.grid}>
        {data.facilities.map((f, idx) => (
          <FadeInUp key={f.id} delay={idx * 0.08}>
            <div className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={f.image} alt={f.name} />
              </div>
              <div className={styles.body}>
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </div>
  );
}
