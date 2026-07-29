"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { usePensionData } from '@/utils/usePensionData';
import FadeInUp from '@/components/FadeInUp';

export default function Reservation() {
  const { data, isLoaded } = usePensionData();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', checkin: '', checkout: '', room: '', message: '' });

  if (!isLoaded) return <div style={{ minHeight: '100vh' }}></div>;

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container">
      <section className={styles.pageHero}>
        <span className="section-tag">Reservation</span>
        <h1 className="section-title">예약 <span>문의</span></h1>
        <p className="section-desc">아래 폼으로 문의하시거나, 전화·카카오톡으로 편하게 연락주세요.</p>
      </section>

      <div className={styles.wrap}>
        <div>
          <FadeInUp>
            <div className={styles.quickCard}>
              <h3>📞 전화 문의</h3>
              <p>{data.footer.phone}</p>
              <a href={`tel:${data.footer.phone}`} className="btn-outline" style={{ width: '100%', textAlign: 'center' }}>전화 걸기</a>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <div className={styles.quickCard}>
              <h3>💬 카카오톡 문의</h3>
              <p>실시간 채팅으로 빠르게 답변드려요</p>
              <a href={data.footer.kakaotalk} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>카카오톡 상담하기</a>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className={styles.noticeBox}>
              {data.reservation.notice}
            </div>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.15}>
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <div className={styles.formRow2}>
              <div className={styles.formRow}>
                <label>이름</label>
                <input required value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="홍길동" />
              </div>
              <div className={styles.formRow}>
                <label>연락처</label>
                <input required value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="010-0000-0000" />
              </div>
            </div>
            <div className={styles.formRow2}>
              <div className={styles.formRow}>
                <label>체크인</label>
                <input type="date" value={form.checkin} onChange={e => handleChange('checkin', e.target.value)} />
              </div>
              <div className={styles.formRow}>
                <label>체크아웃</label>
                <input type="date" value={form.checkout} onChange={e => handleChange('checkout', e.target.value)} />
              </div>
            </div>
            <div className={styles.formRow}>
              <label>희망 객실</label>
              <select value={form.room} onChange={e => handleChange('room', e.target.value)}>
                <option value="">선택 안 함</option>
                {data.rooms.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
              </select>
            </div>
            <div className={styles.formRow}>
              <label>문의 내용</label>
              <textarea rows={4} value={form.message} onChange={e => handleChange('message', e.target.value)} placeholder="인원수, 추가 요청사항 등을 남겨주세요" />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>문의 보내기</button>
            {submitted && <div className={styles.successBox}>문의가 접수되었습니다. 빠르게 연락드릴게요!</div>}
          </form>
        </FadeInUp>
      </div>
    </div>
  );
}
