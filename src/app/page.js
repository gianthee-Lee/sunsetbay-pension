"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { usePensionData } from '@/utils/usePensionData';
import FadeInUp from '@/components/FadeInUp';
import { Flame, Waves, Sunset, Car } from 'lucide-react';

export default function Home() {
  const { data, isLoaded } = usePensionData();

  if (!isLoaded) return <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}></div>;

  return (
    <div>
      {/* Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(${data.home.heroImage})` }}>
        <div className={styles.heroOverlay}>
          <div className="container">
            <h1 className="fade-in">{data.home.heroTitle1}<br /><span className={styles.highlight}>{data.home.heroTitle2}</span></h1>
            <p className="fade-in" style={{ animationDelay: '0.2s' }}>
              {data.home.heroSubtitle}
            </p>
            <div className={`${styles.heroButtons} fade-in`} style={{ animationDelay: '0.4s' }}>
              <Link href="/rooms" className="btn-primary">객실 둘러보기</Link>
              <Link href="/reservation" className={`btn-outline ${styles.heroButtonOutline}`}>예약문의</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <FadeInUp>
              <div className={styles.aboutImage}>
                <img src={data.about.image} alt="선셋베이펜션 전경" />
              </div>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <div className={styles.aboutText}>
                <span className="section-tag">About Us</span>
                <h2>{data.about.title}</h2>
                <p>{data.about.desc1}</p>
                <p>{data.about.desc2}</p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Rooms preview */}
      <section className={styles.roomsSection}>
        <div className="container">
          <FadeInUp>
            <span className="section-tag">Rooms</span>
            <h2 className="section-title">객실 <span>안내</span></h2>
            <p className="section-desc">취향에 맞는 세 가지 타입의 독채 객실을 준비했습니다.</p>
          </FadeInUp>
          <div className={styles.roomGrid}>
            {data.rooms.map((room, idx) => (
              <FadeInUp key={room.id} delay={idx * 0.1}>
                <Link href="/rooms" className={styles.roomCard} style={{ display: 'block' }}>
                  <div className={styles.roomImageWrap}>
                    <img src={room.images[0]} alt={room.name} />
                  </div>
                  <div className={styles.roomBody}>
                    <h3>{room.name}</h3>
                    <p>{room.desc}</p>
                    <div className={styles.roomPrice}>{room.price}</div>
                    <span className="btn-outline" style={{ width: '100%', textAlign: 'center', padding: '10px', fontSize: '0.95rem' }}>자세히 보기</span>
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities quick */}
      <section className="section">
        <div className="container">
          <FadeInUp>
            <span className="section-tag">Facilities</span>
            <h2 className="section-title">왜 <span>선셋베이</span>인가요?</h2>
          </FadeInUp>
          <div className={styles.featuresGrid}>
            <FadeInUp delay={0.1}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}><Flame size={40} strokeWidth={1.5} /></div>
                <h3>프라이빗 바비큐</h3>
                <p>객실별 독립 테라스에서 즐기는 바비큐</p>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}><Waves size={40} strokeWidth={1.5} /></div>
                <h3>인피니티 풀</h3>
                <p>바다를 배경으로 한 야외 수영장</p>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}><Sunset size={40} strokeWidth={1.5} /></div>
                <h3>루프탑 라운지</h3>
                <p>포항 노을을 감상하기 좋은 공용 공간</p>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}><Car size={40} strokeWidth={1.5} /></div>
                <h3>전용 주차공간</h3>
                <p>객실별 전용 주차 공간 무료 제공</p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <FadeInUp>
            <div className={styles.ctaBanner}>
              <div>
                <h2>지금 바로 예약 문의하세요</h2>
                <p>{data.reservation.checkin}</p>
              </div>
              <Link href="/reservation" className={styles.ctaBtn}>예약 문의하기</Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
