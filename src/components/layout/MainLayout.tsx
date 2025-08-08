import type { ReactNode } from "react";
import ScrollVelocity from "../bits/ScrollVelocity";
import Navbar from "../navigation/Navbar";
import { useAppSelector } from "@/app/hooks";
import { selectConfiguration } from "@/features/configuration/configurationSlice";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const config = useAppSelector(selectConfiguration);

  return (
    <div className="flex h-full flex-col">
      <ScrollVelocity
        texts={[
          config.data?.data.store_status == true
            ? config.data?.data.announcement_text
              ? config.data?.data.announcement_text
              : "Welcome to Pooja Samagari!"
            : "Store is Closed will be online Shortly Store is Closed will be online Shortly",
        ]}
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
};

export default MainLayout;
