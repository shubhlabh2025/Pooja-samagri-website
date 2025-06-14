import thali from "@/assets/thali.webp";

const AboutSection = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row">
        <div className="flex w-full flex-1 flex-col">
          <div className="flex h-full w-full justify-end">
            <div className="flex h-full w-full flex-col items-center justify-center p-10 sm:rounded-tl-2xl sm:rounded-bl-2xl">
              <span className="text-[24px] font-bold text-black">Namaste!</span>

              <span className="text-[16px] leading-loose text-black">
                Welcome to the world of SHUBH LABH Pooja Samagri, Bringing
                Devotion To Your Doorstep.. Shubh Labh Pooja Samagri was Founded
                by Mr. Raja Rachakonda & Mr. Yesh Bandaru with the vision of
                seamlessly blending tradition with convenience. With Began as a
                thoughtful business intiative has since flourished into a
                growing enterprise, with the goal of becoming a leading brand in
                India’s devotional space. The company specializes in delivering
                an unlimited range of Pooja Products through our website,
                Andriod & IOS platforms. Bringing devotion directly to the
                doorsteps of households across the nation. With hundreds of
                satisfied customers every month they only get encouraged.
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img className="h-full w-full" src={thali}></img>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="mb-20 flex-1">
          <img className="h-full w-full" src={thali}></img>
        </div>
        <div className="flex w-full flex-1 flex-col">
          <div className="flex h-full w-full justify-end">
            <div className="flex h-full w-full flex-col items-center justify-center p-10 sm:rounded-tl-2xl sm:rounded-bl-2xl">
              <span className="text-[24px] font-bold text-black">
                Our Vision
              </span>

              <span className="text-[16px] leading-loose text-black">
                To Touch more hearts and inspire a deeper connection to
                spiritual Tradition.<br></br>
                “Is to provide the finest religios products, upholding purity,
                heartfelt devotion and uncompromising hygiene in every
                offering.” At SHUBH LABH Pooja Samagri, we are committed to
                preserving the essence of time-honored traditions while
                embracing the power of modern convenience. To serve not just as
                a provider of spiritual essentials, but as a bridge between
                heritage and the future, guiding new generations in their
                devotional journey
              </span>
            </div>
          </div>

          {/* <div className="flex w-full justify-start">
          <div className="flex h-[200px] w-1/2 max-w-1/2 flex-col rounded-tr-2xl rounded-br-2xl bg-red-500">
            <span>About us</span>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
