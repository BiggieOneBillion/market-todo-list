import React from "react";
import Auth from "../auth/auth";
import { RiShoppingBag4Line } from "react-icons/ri";

const Greetings = () => {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-2 w-full h-[100vh]">
      {/* left side */}
      <main className="p-10 flex flex-col items-centery justify-start lg:pt-[20rem] gap-3 lg:gap-1 bg-[#31473A] text-[#7C8363]">
        <p className="font-medium text-white/60y text-xs lg:text-sm capitalize">
          Welcome to your No. 1
        </p>
        <h1 className="font-bold text-2xl lg:text-[40px] text-white/80 lg:mb-2 -mt-3 flex items-center gap-2">
          <span> MARKETLIST ANALYSER</span>
          <span className="text-xl lg:text-[50px]">
            <RiShoppingBag4Line />
          </span>
        </h1>
        <p className="text-white/60y text-sm font-medium text-centery capitalize -mt-1 lg:mt-0">
          <span className="lg:hidden">
            Save your market list and see overtime what is eating your
            money
          </span>
          <span className="hidden lg:inline">
            Save your market list and <br /> see overtime what is eating your
            money
          </span>
        </p>
      </main>
      {/* right side */}
      {/* <section className=""> */}
        <Auth />
      {/* </section> */}
    </section>
  );
};

export default Greetings;
