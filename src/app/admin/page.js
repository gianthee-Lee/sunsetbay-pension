"use client";
import { useState, useEffect } from 'react';
import { usePensionData } from '@/utils/usePensionData';

export default function Admin() {
  const { data, updateData, isLoaded } = usePensionData();
  const [formData, setFormData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = ['Home', 'About', 'Rooms', 'Facilities', 'Location', 'Reservation', 'Footer'];

  useEffect(() => {
    if (isLoaded && !formData) {
      setFormData(data);
    }
  }, [isLoaded, data, formData]);

  if (!isLoaded || !formData) return <div className="container section">Loading...</div>;

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleArrayChange = (category, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[category]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [category]: newArray };
    });
  };

  const handleRoomImageChange = (index, imgIndex, value) => {
    setFormData(prev => {
      const newArray = [...prev.rooms];
      const newImages = [...newArray[index].images];
      newImages[imgIndex] = value;
      newArray[index] = { ...newArray[index], images: newImages };
      return { ...prev, rooms: newArray };
    });
  };

  const addArrayItem = (category, emptyItem) => {
    setFormData(prev => ({
      ...prev,
      [category]: [...prev[category], { ...emptyItem, id: Date.now() }]
    }));
  };

  const removeArrayItem = (category, id) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const uploadFile = async (file) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
    return res.json();
  };

  const handleRoomFileUpload = async (idx, imgIndex, event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const resData = await uploadFile(file);
      if (resData.success) {
        handleRoomImageChange(idx, imgIndex, resData.url);
      } else {
        alert('업로드 실패: ' + resData.error);
      }
    } catch (err) {
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  const handleFacilityFileUpload = async (idx, event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const resData = await uploadFile(file);
      if (resData.success) {
        handleArrayChange('facilities', idx, 'image', resData.url);
      } else {
        alert('업로드 실패: ' + resData.error);
      }
    } catch (err) {
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  const handleHeroFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const resData = await uploadFile(file);
      if (resData.success) {
        handleNestedChange('home', 'heroImage', resData.url);
      } else {
        alert('업로드 실패: ' + resData.error);
      }
    } catch (err) {
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateData(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sectionStyle = { backgroundColor: 'var(--bg-dark)', padding: '30px', borderRadius: '12px', marginBottom: '30px' };
  const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '15px' };
  const labelStyle = { display: 'block', fontWeight: 'bold', margin: '15px 0 5px 0' };

  return (
    <div className="container">
      <section className="section" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <h1 className="section-title" style={{ textAlign: 'center' }}>콘텐츠 <span>관리자</span></h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: activeTab === tab ? 'var(--primary-color)' : 'var(--bg-dark)',
                color: activeTab === tab ? '#fff' : 'var(--text-light)',
                transition: 'all 0.2s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave}>

          {activeTab === 'Home' && (
            <div style={sectionStyle}>
              <h2>🏠 메인 페이지 (Home)</h2>
              <label style={labelStyle}>메인 타이틀 1</label>
              <input type="text" style={inputStyle} value={formData.home.heroTitle1} onChange={e => handleNestedChange('home', 'heroTitle1', e.target.value)} />
              <label style={labelStyle}>메인 타이틀 2 (강조)</label>
              <input type="text" style={inputStyle} value={formData.home.heroTitle2} onChange={e => handleNestedChange('home', 'heroTitle2', e.target.value)} />
              <label style={labelStyle}>메인 서브타이틀</label>
              <input type="text" style={inputStyle} value={formData.home.heroSubtitle} onChange={e => handleNestedChange('home', 'heroSubtitle', e.target.value)} />
              <label style={labelStyle}>메인 배경 사진</label>
              <div style={{ width: '200px', height: '120px', backgroundColor: '#eee', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                <img src={formData.home.heroImage} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <input type="file" accept="image/*" onChange={handleHeroFileUpload} style={{ marginBottom: '10px' }} />
              <input type="text" style={inputStyle} value={formData.home.heroImage} onChange={e => handleNestedChange('home', 'heroImage', e.target.value)} placeholder="https://..." />
            </div>
          )}

          {activeTab === 'About' && (
            <div style={sectionStyle}>
              <h2>🏡 소개 (About)</h2>
              <label style={labelStyle}>소개 제목</label>
              <input type="text" style={inputStyle} value={formData.about.title} onChange={e => handleNestedChange('about', 'title', e.target.value)} />
              <label style={labelStyle}>소개 문구 1</label>
              <textarea style={{ ...inputStyle, height: '80px' }} value={formData.about.desc1} onChange={e => handleNestedChange('about', 'desc1', e.target.value)} />
              <label style={labelStyle}>소개 문구 2</label>
              <textarea style={{ ...inputStyle, height: '80px' }} value={formData.about.desc2} onChange={e => handleNestedChange('about', 'desc2', e.target.value)} />
            </div>
          )}

          {activeTab === 'Rooms' && (
            <div style={sectionStyle}>
              <h2>🛏️ 객실 관리 (Rooms)</h2>
              {formData.rooms.map((room, idx) => (
                <div key={room.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '20px' }}>
                  <input type="text" style={inputStyle} value={room.name} onChange={e => handleArrayChange('rooms', idx, 'name', e.target.value)} placeholder="객실명" />
                  <textarea style={{ ...inputStyle, height: '60px' }} value={room.desc} onChange={e => handleArrayChange('rooms', idx, 'desc', e.target.value)} placeholder="객실 설명" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <input type="text" style={inputStyle} value={room.price} onChange={e => handleArrayChange('rooms', idx, 'price', e.target.value)} placeholder="가격 (예: 170,000원~)" />
                    <input type="text" style={inputStyle} value={room.capacity} onChange={e => handleArrayChange('rooms', idx, 'capacity', e.target.value)} placeholder="인원" />
                    <input type="text" style={inputStyle} value={room.size} onChange={e => handleArrayChange('rooms', idx, 'size', e.target.value)} placeholder="면적" />
                  </div>

                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: '10px 0 6px 0' }}>객실 사진 (최대 3장)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '10px' }}>
                    {[0, 1, 2].map(imgIdx => (
                      <div key={imgIdx}>
                        <div style={{ width: '100%', height: '80px', backgroundColor: '#f0f0f0', borderRadius: '6px', overflow: 'hidden', marginBottom: '4px' }}>
                          {room.images[imgIdx] && <img src={room.images[imgIdx]} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleRoomFileUpload(idx, imgIdx, e)} style={{ fontSize: '0.75rem', width: '100%' }} />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => removeArrayItem('rooms', room.id)} style={{ color: 'red', fontWeight: 'bold', width: '100%', textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer' }}>삭제하기</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('rooms', { name: "새 객실", desc: "설명을 입력하세요", price: "150,000원~", capacity: "기준 2인", size: "30㎡", images: ["https://images.unsplash.com/photo-1551927411-95e412943b58?auto=format&fit=crop&w=1600&q=80", "", ""] })} className="btn-outline" style={{ marginTop: '10px', padding: '10px', width: '100%' }}>+ 객실 추가하기</button>
            </div>
          )}

          {activeTab === 'Facilities' && (
            <div style={sectionStyle}>
              <h2>🏊 부대시설 (Facilities)</h2>
              {formData.facilities.map((f, idx) => (
                <div key={f.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <input type="text" style={inputStyle} value={f.name} onChange={e => handleArrayChange('facilities', idx, 'name', e.target.value)} placeholder="시설명" />
                      <textarea style={{ ...inputStyle, height: '50px' }} value={f.desc} onChange={e => handleArrayChange('facilities', idx, 'desc', e.target.value)} placeholder="설명" />
                    </div>
                    <div style={{ width: '120px', height: '90px', backgroundColor: '#f0f0f0', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={f.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleFacilityFileUpload(idx, e)} style={{ marginTop: '8px' }} />
                  <button type="button" onClick={() => removeArrayItem('facilities', f.id)} style={{ color: 'red', fontWeight: 'bold', width: '100%', textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px' }}>삭제하기</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('facilities', { name: "새 시설", desc: "설명을 입력하세요", image: "https://images.unsplash.com/photo-1716904519810-349244919824?auto=format&fit=crop&w=1600&q=80" })} className="btn-outline" style={{ marginTop: '10px', padding: '10px', width: '100%' }}>+ 시설 추가하기</button>
            </div>
          )}

          {activeTab === 'Location' && (
            <div style={sectionStyle}>
              <h2>📍 오시는 길 (Location)</h2>
              <label style={labelStyle}>주소</label>
              <input type="text" style={inputStyle} value={formData.location.address} onChange={e => handleNestedChange('location', 'address', e.target.value)} />
              <label style={labelStyle}>찾아오는 방법</label>
              <textarea style={{ ...inputStyle, height: '60px' }} value={formData.location.directions} onChange={e => handleNestedChange('location', 'directions', e.target.value)} />
              <label style={labelStyle}>지도 검색어 (지역명)</label>
              <input type="text" style={inputStyle} value={formData.location.mapQuery} onChange={e => handleNestedChange('location', 'mapQuery', e.target.value)} />
            </div>
          )}

          {activeTab === 'Reservation' && (
            <div style={sectionStyle}>
              <h2>📅 예약 안내 (Reservation)</h2>
              <label style={labelStyle}>예약 안내 문구</label>
              <textarea style={{ ...inputStyle, height: '60px' }} value={formData.reservation.notice} onChange={e => handleNestedChange('reservation', 'notice', e.target.value)} />
              <label style={labelStyle}>체크인/체크아웃 시간</label>
              <input type="text" style={inputStyle} value={formData.reservation.checkin} onChange={e => handleNestedChange('reservation', 'checkin', e.target.value)} />
            </div>
          )}

          {activeTab === 'Footer' && (
            <div style={sectionStyle}>
              <h2>⬇️ 하단 정보 (Footer)</h2>
              <label style={labelStyle}>브랜드 문구 1</label>
              <input type="text" style={inputStyle} value={formData.footer.desc1} onChange={e => handleNestedChange('footer', 'desc1', e.target.value)} />
              <label style={labelStyle}>브랜드 문구 2</label>
              <input type="text" style={inputStyle} value={formData.footer.desc2} onChange={e => handleNestedChange('footer', 'desc2', e.target.value)} />
              <label style={labelStyle}>주소</label>
              <input type="text" style={inputStyle} value={formData.footer.address} onChange={e => handleNestedChange('footer', 'address', e.target.value)} />
              <label style={labelStyle}>전화번호</label>
              <input type="text" style={inputStyle} value={formData.footer.phone} onChange={e => handleNestedChange('footer', 'phone', e.target.value)} />
              <label style={labelStyle}>운영시간</label>
              <input type="text" style={inputStyle} value={formData.footer.hours} onChange={e => handleNestedChange('footer', 'hours', e.target.value)} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <label style={{ ...labelStyle, margin: 0 }}>네이버 블로그 링크</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={formData.footer.showBlog !== false} onChange={e => handleNestedChange('footer', 'showBlog', e.target.checked)} />
                  방문자 페이지에 표시
                </label>
              </div>
              <input type="text" style={inputStyle} value={formData.footer.blogLink || ''} onChange={e => handleNestedChange('footer', 'blogLink', e.target.value)} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <label style={{ ...labelStyle, margin: 0 }}>인스타그램 링크</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={formData.footer.showInstagram || false} onChange={e => handleNestedChange('footer', 'showInstagram', e.target.checked)} />
                  방문자 페이지에 표시
                </label>
              </div>
              <input type="text" style={inputStyle} value={formData.footer.instagram || ''} onChange={e => handleNestedChange('footer', 'instagram', e.target.value)} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <label style={{ ...labelStyle, margin: 0 }}>카카오톡 링크</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={formData.footer.showKakaotalk || false} onChange={e => handleNestedChange('footer', 'showKakaotalk', e.target.checked)} />
                  방문자 페이지에 표시
                </label>
              </div>
              <input type="text" style={inputStyle} value={formData.footer.kakaotalk || ''} onChange={e => handleNestedChange('footer', 'kakaotalk', e.target.value)} />
            </div>
          )}

          <div style={{ position: 'sticky', bottom: '20px', zIndex: 100 }}>
            <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '15px', borderRadius: '12px' }}>
              현재 탭 포함 전체 변경사항 저장하기
            </button>
            {saved && (
              <div style={{ backgroundColor: '#4caf50', color: 'white', textAlign: 'center', padding: '15px', borderRadius: '8px', marginTop: '10px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                성공적으로 저장되었습니다!
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
