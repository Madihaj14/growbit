
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ZenBackground from "../background/ZenBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ZenBackground />
      <Header />
      <main className="flex-grow growbit-container py-6 md:py-10 z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
