import { Container, Header } from "@/shared/components/widgets";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Корзина",
  description: "Generated by create next app",
};

// Layout для раздела со страницей оплаты
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Suspense>
          <Header
            hasSearch={false}
            hasCart={false}
            className="border-b-gray-200"
          />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
