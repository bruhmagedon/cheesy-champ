import { Header } from "@/shared/components/widgets";
import type { Metadata } from "next";
import { Suspense } from "react";

// мета в дочерних лэйаутах
export const metadata: Metadata = {
  title: "Cheese Champ | Главная",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
