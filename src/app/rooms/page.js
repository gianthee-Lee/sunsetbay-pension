"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { usePensionData } from '@/utils/usePensionData';
import FadeInUp from '@/components/FadeInUp';

export default function Rooms() {
  const { data, isLoaded } = usePensionData();

  if (!isLoaded) return <div style={{ minHeight: '100vh' }}></div>;

  return (
    <div className="container">
      <section className={styles.pageHero}>
        <span className="section-tag">Rooms</span>
        <h1 className="section-title">객실 <span>안내</span></h1>
        <p className="section-desc">모든 객실은 독립된 동으로 구성되어 있어 프라이빗한 휴식이 가능합니다.</p>
      </section>

      <div className={styles.roomList}>
        {data.rooms.map((room, idx) => (
          <FadeInUp key={room.id} delay={idx * 0.05}>
            <div className={styles.roomBlock}>
              <div className={styles.gallery}>
                <div className={styles.galleryMain}>
                  <img src={room.images[0]} alt={room.name} />
                </div>
                <div className={styles.gallerySide}>
                  <img src={room.images[1] || room.images[0]} alt={room.name} />
                  <img src={room.images[2] || room.images[0]} alt={room.name} />
                </div>
              </div>
              <div className={styles.detail}>
                <h3>{room.name}</h3>
                <p className="desc">{room.desc}</p>
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}><span>인원</span>{room.capacity}</div>
                  <div className={styles.metaItem}><span>면적</span>{room.size}</div>
                  <div className={styles.metaItem}><span>체크인/아웃</span>{data.reservation.checkin}</div>
                </div>
                <div className={styles.price}>{room.price}</div>
                <Link href="/reservation" className="btn-primary" style={{ textAlign: 'center' }}>이 객실로 예약문의</Link>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </div>
  );
}
