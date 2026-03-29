import Footer from "../Footer";
import Header from "./Header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-1200 px-24">{children}</div>
      </main>

      <Footer />
    </>
  );
}
