import type { ReactNode } from "react";
import MarqueeText from "../custom/MarqueeTree";
import HomeNavBar from "../navigation/HomeNavBar";

const MainLayout = ({ children }: { children: ReactNode }) => (
  <>
    <MarqueeText
      text="🚀 Welcome to the React TS Marquee Component Demo!"
      speed={15}
    />
    <HomeNavBar />
    <main>{children}</main>
  </>
);

export default MainLayout;
