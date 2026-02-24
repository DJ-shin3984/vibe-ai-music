import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 — Vibe AI Music",
  description: "Google로 로그인하여 서비스를 이용하세요",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
