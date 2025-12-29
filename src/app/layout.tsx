/* NEXT */
import type { Metadata } from "next";
import localFont from 'next/font/local';

/* CSS */
import "./globals.css";

/* 컴포넌트 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  weight: '45 920',
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: "투치 - 대한민국 구석구석 여행 가이드",
  description: "어디로 떠날지 고민될 때, 터치 한 번으로 시작하는 여행",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
