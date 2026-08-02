"use client";
import { useState, useEffect } from 'react';

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const defaultData = {
  home: {
    heroTitle1: "포항 바다를 마당처럼",
    heroTitle2: "선셋베이펜션",
    heroSubtitle: "오션뷰 독채형 펜션 / 프라이빗 바비큐 테라스 / 도심 속 힐링",
    heroImage: img("photo-1734387981942-06a25bf3b3d2"),
  },
  about: {
    title: "바다와 가장 가까운 쉼표",
    desc1: "선셋베이펜션은 포항 해안가에 자리한 독채형 감성 펜션입니다. 통유리창 너머로 펼쳐지는 노을과 파도 소리를 그대로 안고 잠드는 하루를 선물합니다.",
    desc2: "전 객실 독립 동으로 분리되어 있어 다른 투숙객과 마주칠 일 없이 온전히 나만의 시간을 누릴 수 있고, 프라이빗 바비큐 테라스와 야외 수영장까지 갖추고 있습니다.",
    image: img("photo-1699209148943-acacf2821f33"),
  },
  rooms: [
    {
      id: 1,
      name: "오션뷰 디럭스",
      desc: "탁 트인 바다 전망과 킹사이즈 침대, 개별 테라스가 있는 대표 객실",
      price: "170,000원~",
      capacity: "기준 2인 / 최대 4인",
      size: "33㎡",
      images: [img("photo-1551927411-95e412943b58"), img("photo-1703782997446-fba282cbfce6"), img("photo-1631554668504-79dd66bbfb94")],
    },
    {
      id: 2,
      name: "포레스트 스위트",
      desc: "숲을 향한 통창과 반신욕 스파, 커플 여행객에게 인기가 많은 룸",
      price: "195,000원~",
      capacity: "기준 2인 / 최대 3인",
      size: "40㎡",
      images: [img("photo-1727706572437-4fcda0cbd66f"), img("photo-1631941392209-70cad44ecfb7"), img("photo-1633590949395-75650fae5599")],
    },
    {
      id: 3,
      name: "패밀리 복층",
      desc: "복층 구조로 넓게 쓸 수 있는 가족·모임용 대형 객실",
      price: "260,000원~",
      capacity: "기준 4인 / 최대 8인",
      size: "56㎡",
      images: [img("photo-1631805991633-eb01749753af"), img("photo-1703783010857-9bd7a7b97c50"), img("photo-1767348922879-a5cade5cceff")],
    },
  ],
  facilities: [
    { id: 1, name: "프라이빗 바비큐 테라스", desc: "객실마다 독립된 테라스에서 즐기는 바비큐", image: img("photo-1716904519810-349244919824") },
    { id: 2, name: "인피니티 풀", desc: "바다를 배경으로 한 야외 수영장 (하절기 운영)", image: img("photo-1767950470198-c9cd97f8ed87") },
    { id: 3, name: "루프탑 라운지", desc: "노을 감상하기 좋은 공용 루프탑 공간", image: img("photo-1710927383995-1bb250271f5e") },
    { id: 4, name: "프라이빗 주차장", desc: "객실별 전용 주차 공간 무료 제공", image: img("photo-1624409990662-03f19cc0e0cc") },
  ],
  location: {
    address: "경상북도 포항시 남구 호미로 482-11",
    directions: "포항종합버스터미널에서 차량 25분 / KTX 포항역에서 차량 35분",
    mapQuery: "포항시 남구",
  },
  reservation: {
    notice: "네이버 예약 · 전화 · 카카오톡 중 편하신 방법으로 문의해주세요. 성수기 주말은 마감이 빠르니 서둘러 예약해주세요!",
    checkin: "체크인 15:00 / 체크아웃 11:00",
  },
  footer: {
    desc1: "포항 바다를 마당처럼 누리는 곳",
    desc2: "선셋베이펜션",
    address: "경상북도 포항시 남구 호미로 482-11",
    phone: "010-2345-6789",
    hours: "예약문의 09:00 - 21:00 (연중무휴)",
    blogLink: "https://blog.naver.com",
    showBlog: true,
    instagram: "https://instagram.com",
    showInstagram: true,
    kakaotalk: "https://pf.kakao.com",
    showKakaotalk: true,
  },
};

export function usePensionData() {
  const [data, setData] = useState(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pensionData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData({
          ...defaultData,
          ...parsed,
          home: { ...defaultData.home, ...(parsed.home || {}) },
          about: { ...defaultData.about, ...(parsed.about || {}) },
          location: { ...defaultData.location, ...(parsed.location || {}) },
          reservation: { ...defaultData.reservation, ...(parsed.reservation || {}) },
          footer: { ...defaultData.footer, ...(parsed.footer || {}) },
        });
      } catch (e) {
        console.error("Failed to parse pensionData", e);
      }
    } else {
      localStorage.setItem('pensionData', JSON.stringify(defaultData));
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem('pensionData', JSON.stringify(newData));
  };

  return { data, updateData, isLoaded };
}
