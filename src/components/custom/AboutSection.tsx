import SvgOfAboutSection from "@/components/SvgOfAboutSection";
import thunder from "@/assets/thunder.svg";
import valuesCard1 from "@/assets/valuesCard1.svg";
import valuesCard2 from "@/assets/valuesCard2.svg";
import valuesCard3 from "@/assets/valuesCard3.svg";

const AboutSection = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center bg-white px-10 py-20">
        <p className="text-center text-[11.5px] leading-[13px] font-semibold text-black">
          ABOUT US
        </p>
        <h1 className="mt-8 text-center text-[40px] tracking-[-1px] text-black">
          Pure, Sacred, Everyday
        </h1>
        <p className="mt-6 max-w-125 text-center text-black">
          We believe that by bringing devotion and convenience together, every
          home can stay connected to tradition—effortlessly, purely, and with
          heart.
        </p>
        <div className="mt-10 w-full max-w-200">
          <SvgOfAboutSection />
        </div>
        <div className="mt-10 flex w-full items-center justify-between gap-10 rounded-[20px] bg-[#d7c4fa] p-8">
          <div>
            <p className="text-[11.5px] leading-[13px] font-semibold text-[#4d3e78]">
              OUR MISSION
            </p>
            <p className="mt-6 max-w-80 text-[28px] font-semibold tracking-[-0.84px] text-[#4d3e78]">
              To make every pooja pure, easy, and complete.
            </p>
          </div>
          <div>
            <img
              loading="lazy"
              src={thunder}
              alt="Thunder"
              className="w- aspect-square h-20"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <p className="mt-20 text-center text-5xl leading-13 font-normal tracking-[-1.5px] text-black">
            Our values
          </p>
          <div className="mt-10 flex w-full flex-col gap-15 lg:flex-row">
            <div className="flex flex-1 flex-col justify-between gap-6 rounded-3xl bg-[#d6edd9] p-8">
              <p className="leading-5.2 text-[16px] font-medium text-[#195642]">
                We believe devotion should be effortless. From browsing to
                delivery, everything we offer is designed to be pure, simple,
                and intuitive—so you can focus on what truly matters: your
                prayer and peace of mind.
              </p>
              <div className="flex items-end justify-between">
                <p className="text-2xl leading-6.5 text-[#1f7a57]">
                  Simplicity
                </p>
                <img
                  loading="lazy"
                  src={valuesCard1}
                  alt="Values Card 1"
                  className="h-[50px] max-w-200"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 rounded-3xl bg-[#ffdce8] p-8">
              <p className="leading-5.2 text-[16px] font-medium text-[#763359]">
                Rituals don’t wait—and neither should you. We act with care, but
                never delay. From processing your orders quickly to resolving
                queries with urgency, we deliver with speed and purpose—so your
                spiritual needs are always met on time.
              </p>
              <div className="flex items-end justify-between">
                <p className="text-2xl leading-6.5 text-[#A54b74]">Speed</p>
                <img
                  loading="lazy"
                  src={valuesCard2}
                  alt="Values Card 1"
                  className="h-[50px] max-w-200"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 rounded-3xl bg-[#ffe0cc] p-8">
              <p className="leading-5.2 text-[16px] font-medium text-[#803218]">
                We stand for purity, quality, and integrity in everything we do.
                Whether it's sourcing authentic items or serving our customers
                with honesty, we ensure every interaction is rooted in trust,
                transparency, and respect for tradition.
              </p>
              <div className="flex items-end justify-between">
                <p className="text-2xl leading-6.5 text-[#B74d18]">Soundness</p>
                <img
                  loading="lazy"
                  src={valuesCard3}
                  alt="Values Card 1"
                  className="h-[50px] max-w-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
