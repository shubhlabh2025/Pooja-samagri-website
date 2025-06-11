import type { ReactNode } from "react";
import MarqueeText from "../custom/MarqueeTree";
import HomeNavBar from "../navigation/HomeNavBar";
import CartSummaryBanner from "@/components/common/CartSummaryBanner";

const MainLayoutWithCart = ({ children }: { children: ReactNode }) => (
  <div className="flex h-full min-h-screen flex-col">
    <MarqueeText text="🚀 Welcome!" speed={15} />
    <HomeNavBar />
    <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
    <CartSummaryBanner />
  </div>
);

export default MainLayoutWithCart;
