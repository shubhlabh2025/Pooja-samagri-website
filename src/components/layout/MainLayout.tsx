import type { ReactNode } from "react";
import ScrollVelocity from "../bits/ScrollVelocity";
import Navbar from "../navigation/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex h-full flex-col">
    <ScrollVelocity
      texts={["✨ Simplicity • Speed • Soundness • Pure Sacred Everyday ✨"]}
      velocity={-120}
      parallaxClassName="py-0.5 shadow-lg"
      scrollerClassName="py-0.5"
      parallaxStyle={{
        background: "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
      }}
      className="px-8 text-lg font-medium tracking-wide text-[#000000]"
    />
    <Navbar />
    <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
  </div>
);

export default MainLayout;
