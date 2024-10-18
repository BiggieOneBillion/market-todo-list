import { Button } from "@chakra-ui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { authStore, authType, userStore } from "../store/GlobalStore";
import { useToggle, useWindowSize } from "@reactuses/core";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useEffect } from "react";

type Prop = {
  on: boolean;
  toggle: (nextValue?: any) => void;
};

const Sidenavbar = ({ on, toggle }: Prop) => {
  const updateIsAllowed = authStore(
    (state: unknown) => (state as authType).updateIsAllowed
  );
  const handleLogOut = () => {
    // clear the data of the user from the localstorage
    userStore.persist.clearStorage();
    // send the user back to the login page
    updateIsAllowed(false);
  };
  const { width } = useWindowSize();

  const location = useLocation();

  return (
    <nav
      className={`fixed top-0 left-0 ${
        on ? "block" : "hidden"
      } md:block  w-[250px] md:relative bg-white z-10 lg:block lg:w-[250px] md:pt-20 pb-10 h-[100dvh]`}
    >
      <ul className="flex flex-col justify-start gap-4 p-4 h-full">
        {width < 760 && (
          <li className="flex items-center justify-between space-y-3y">
            <h1 className="font-semibold">Market List</h1>
            {/* close button */}
            <span className="text-2xl" onClick={toggle}>
              <AiOutlineCloseSquare />
            </span>
          </li>
        )}
        <li>
          <NavLink
            to={"/dashboard"}
            className={() =>
              location.pathname === "/dashboard"
                ? "bg-[#31473A] text-white py-3 rounded-md inline-block px-4 font-semibold w-full"
                : "text-[#31473A] border border-[#31473A] bg-white py-3 rounded-md inline-block px-4 font-semibold w-full"
            }
          >
            Create market list
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/all/list"}
            className={() =>
              location.pathname.includes("/all/list")
                ? "bg-[#31473A] text-white py-3 rounded-md inline-block px-4 font-semibold w-full"
                : "text-[#31473A] border border-[#31473A] bg-white py-3 rounded-md inline-block px-4 font-semibold w-full"
            }
          >
            All Market List
          </NavLink>
        </li>
        <li className="cursor-none">
          <NavLink
            to={"/dashboard/list"}
            className="bg-[#31473A]/10 text-white cursor-none py-3 rounded-md inline-block px-4 font-semibold w-full"
          >
            Analysis
          </NavLink>
        </li>
        <div className="mt-auto">
          <Button
            colorScheme="blackAlpha"
            width={"100%"}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </div>
      </ul>
    </nav>
  );
};

export default Sidenavbar;
