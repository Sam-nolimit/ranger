"use client";

import Image from "next/image";
import companyLogo from "../assets/companyLogo.png";

import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center md:justify-between md:py-6 p-5 bg-red-300/10 ">
        <div 
        className="
        absolute 
        top-0
        left-0
        w-full
        h-96
        bg-gradient-to-br
        from-blue-900
        to-[#0b3768]
        rounded-md
        filter
        blur-3xl
        opacity-40
        -z-50

        " />
        <Image
          src={companyLogo}
          //   src="https://links.papareact.com/c2cdd5"
          alt="ATWS Logo"
          width={400}
          height={300}
          className=" w-44 md:w-56 pb-10 md:pb-0 object-contain"
        /> 
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* search box */}
          <form className="flex flex-1 items-center p-2 space-x-5 rounded-xl shadow-md bg-white md:flex-initial">
            <MagnifyingGlassIcon className="h-7 w-7 text-gray-400 " />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 h-10 px-2 outline-none rounded-lg"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar
            className="cursor"
            name="sam-nolimit hh"
            round
            size="50"
            color="#0b3768"
          />
        </div>
      </div>

      <div className="flex items-center justify-center px-5 md:py-5 ">
        <p className="flex items-center text-sm font-light p-5 pr-5 shadow-xl bg-white rounded-xl w-fit italic max-w-3xl text-[#0b3768]">
          <UserCircleIcon className="inline-block h-10 w-10 text-[#0b3768] mr-1  " />
          GPT-5 is summarising your tasks for the day ...
        </p>
      </div>
    </header>
  );
}

export default Header;
