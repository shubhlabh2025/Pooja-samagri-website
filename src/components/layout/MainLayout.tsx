import type { ReactNode } from "react";
import MarqueeText from "../custom/MarqueeTree";
import HomeNavBar from "../navigation/HomeNavBar";

const MainLayout = ({ children }: { children: ReactNode }) => (

  
  <div className="flex h-full min-h-screen flex-col">
    <MarqueeText
      text="🚀 Welcome to the React TS Marquee Component Demo!"
      speed={15}
    />
    <HomeNavBar />
    <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
  </div>
);

export default MainLayout;
