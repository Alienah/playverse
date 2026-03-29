import Footer from "../Footer";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-1200 px-24 py-48">{children}</div>
      </main>

      <Footer />
    </>
  );
}
