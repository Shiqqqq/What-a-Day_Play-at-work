import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '今日上朝 - 搞笑日常记录',
  description: '记录你每天的沙雕生活，做个快乐的废物',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100">
          {children}
        </div>
      </body>
    </html>
  );
}