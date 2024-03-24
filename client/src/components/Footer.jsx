import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="px-[32px] pt-[48px] pb-[60px]">
      <div className="mt-[32px] mb-[24px] flex">
        <div className="flex w-[85%]">
          <div className="w-[20%]">
            <div className="font-semibold text-white mb-[8px]">Company</div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              About
            </div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              Jobs
            </div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              For the Record
            </div>
          </div>

          <div className="w-[20%]">
            <div className="font-semibold text-white mb-[8px]">Communities</div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              For Artists
            </div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              Developers
            </div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              Advertising
            </div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              Investors
            </div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              Vendors
            </div>
          </div>

          <div className="w-[20%]">
            <div className="font-semibold text-white mb-[8px]">
              Useful links
            </div>
            <div className="my-[8px hover:text-white hover:underline hover:cursor-pointer">
              Support
            </div>
            <div className="my-[8px] hover:text-white hover:underline hover:cursor-pointer">
              Free Mobile App
            </div>
          </div>
        </div>

        <div className="social-media w-[15%] flex justify-evenly">
          <span className="w-[40px] h-[40px] bg-[#292929] rounded-full flex justify-center items-center hover:bg-[#727272]">
            <FontAwesomeIcon icon={faInstagram} className="text-white" />
          </span>
          <span className="w-[40px] h-[40px] bg-[#292929] rounded-full flex justify-center items-center hover:bg-[#727272]">
            <FontAwesomeIcon icon={faTwitter} className="text-white" />
          </span>
          <span className="w-[40px] h-[40px] bg-[#292929] rounded-full flex justify-center items-center hover:bg-[#727272]">
            <FontAwesomeIcon icon={faFacebook} className="text-white" />
          </span>
        </div>
      </div>
      <hr className="border-[1px] border-[#282828] mb-[24px]" />
      <div className="pt-[16px] flex justify-between">
        <div className="flex">
          <div className="mr-[8px] text-[14px] hover:text-white hover:cursor-pointer">
            Legal
          </div>
          <div className="mx-[8px] text-[14px] hover:text-white hover:cursor-pointer">
            Safety & Privacy Center
          </div>
          <div className="mx-[8px] text-[14px] hover:text-white hover:cursor-pointer">
            Privacy Policy
          </div>
          <div className="mx-[8px] text-[14px] hover:text-white hover:cursor-pointer">
            Cookies
          </div>
          <div className="mx-[8px] text-[14px] hover:text-white hover:cursor-pointer">
            About Ads
          </div>
          <div className="mx-[8px] text-[14px] hover:text-white hover:cursor-pointer">
            Accessibility
          </div>
        </div>
        <div>
          <div className="text-[14px]">© 2024 Spotifree</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
