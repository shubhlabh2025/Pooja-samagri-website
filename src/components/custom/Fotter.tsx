import mastercart from "@/assets/mastercard.svg";
import playstore from "@/assets/playStore.png";
import appstore from "@/assets/appleStore.svg";
import instagram from "@/assets/instagram.svg";
import facebook from "@/assets/facebook.svg";
import twitter from "@/assets/twitter.svg";
import youtube from "@/assets/youtube.svg";
import logo from "@/assets/FooterIcon.png";
import paytm from "@/assets/paytm.svg";
import rupay from "@/assets/rupay.svg";
import visa from "@/assets/visa.svg";
import upi from "@/assets/upi.svg";
import { useGetCartItemsQuery } from "@/features/cart/cartAPI";
import { useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: cartRespnse = { data: [] } } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });
  return (
    <footer className="relative flex w-full flex-col bg-black px-8 pt-8 pb-6">
      <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-end">
        <div className="gap4 flex flex-col gap-4">
          <p className="text-center text-[13px] leading-[19.5px] text-white sm:text-left">
            Follow us on
          </p>
          <div className="flex gap-4">
            <a
              className="cursor-pointer"
              target="_blank"
              href="https://youtube.com/@shubhlabhpoojasamagri?si=I_aIGlYx9pk6UrJb"
            >
              <img loading="lazy" src={youtube} alt="YouTube" className="h-[23px]" />
            </a>
            <a
              className="cursor-pointer"
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61576353127026&ref=_ig_profile_ac"
            >
              <img loading="lazy" src={facebook} alt="Facebook" className="h-[23px]" />
            </a>
            <a
              className="cursor-pointer"
              target="_blank"
              href="https://www.instagram.com/shubhlabhindia/"
            >
              <img loading="lazy" src={instagram} alt="Instagram" className="h-[23px]" />
            </a>
            <a
              className="cursor-pointer"
              target="_blank"
              href="https://x.com/Shubhlabhindia"
            >
              <img loading="lazy" src={twitter} alt="Twitter" className="h-[23px]" />
            </a>
          </div>
        </div>
        <div className="flex gap-5">
          <a className="cursor-pointer" target="_blank">
            <img loading="lazy" src={appstore} alt="App Store" className="h-10.5" />
          </a>
          <a className="cursor-pointer" target="_blank">
            <img loading="lazy" src={playstore} alt="Play Store" className="h-10.5" />
          </a>
        </div>
      </div>
      <div className="mt-6 mb-4 border-t border-[#333]"></div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:gap-5">
        <p
          className="cursor-pointer text-[13px] leading-[16.5px] text-white"
          onClick={() => {
            navigate("/profile", { state: { tab: "policies" } });
          }}
        >
          Terms of Service
        </p>
        <a className="cursor-pointer text-[13px] leading-[16.5px] text-white">
          About Us
        </a>
        <a className="cursor-pointer text-[13px] leading-[16.5px] text-white">
          FAQ
        </a>

        <a className="cursor-pointer text-[13px] leading-[16.5px] text-white">
          Manage Cookies
        </a>
      </div>
      <div className="mt-8 flex items-end justify-between">
        <div className="flex flex-col">
          <p className="text-sm leading-[21px] text-[#666666]">
            Star Mena Mehta Residency, Gurudwara Ln,{" "}
          </p>
          <p className="text-sm leading-[21px] text-[#666666]">
            Kumar Basti, Ameerpet
          </p>
          <p className="text-sm leading-[21px] text-[#666666]">
            Hyderabad,Telangana 500016
          </p>
          <p className="text-sm leading-[21px] text-[#666666]">India</p>
        </div>
        <div className="flex items-center justify-center overflow-hidden rounded-md">
          <img loading="lazy" src={logo} alt="ShubhLabh Logo" className="aspect-square h-21" />
        </div>
      </div>
      <div className="mt-6 mb-4 border-t border-[#333]"></div>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <img loading="lazy" src={visa} alt="Visa" className="h-[20px]" />
          <img loading="lazy" src={mastercart} alt="MasterCard" className="h-[20px]" />
          <img loading="lazy" src={rupay} alt="RuPay" className="h-[45px]" />
          <img loading="lazy" src={upi} alt="UPI" className="h-[27px]" />
          <img loading="lazy" src={paytm} alt="Paytm" className="h-[45px]" />
        </div>
        <p className="text-center text-xs tracking-wide text-[#ffffffb3] sm:text-left">
          © 2025 ShubhLabh. All rights reserved.
        </p>
      </div>
      {cartRespnse.data.length > 0 && (
        <div className="absolute bottom-[-70px] left-0 h-[70px] w-full bg-black" />
      )}
    </footer>
  );
};

export default Footer;
