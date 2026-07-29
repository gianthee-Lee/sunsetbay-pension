import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

export const metadata = {
  title: "선셋베이펜션 | 포항 오션뷰 독채펜션",
  description: "포항 해안가 오션뷰 독채형 펜션, 선셋베이펜션. 프라이빗 바비큐 테라스와 인피니티 풀을 갖춘 감성 숙소.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <SplashScreen />
        <Header />
        <main style={{ minHeight: "calc(100vh - 80px - 200px)" }}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
