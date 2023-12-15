"use client";

import { NAV_LINKS } from "./Navlinks/NavLinks";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { SET_LOGOUT } from "@/Redux/Features/authSlice";

const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const dispatch = useDispatch();
  const handleToggleDropdown = () => {
    setDropDownMenu(!dropDownMenu);
  };
  const { data: session } = useSession();

  const handleLogout = async () => {
    console.log("handleLogout function called");
    try {
      console.log("Before signOut");
      await signOut({ redirect: false });
      console.log("After signOut");
      dispatch(SET_LOGOUT());
      console.log("logout sucessfull");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/assets/Svg/r-logo.svg" alt="logo" width={74} height={29} />
      </Link>
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key} className="relative">
            <Link
              href={link.href}
              className="regular-16 text-black flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="lg:flexCenter hidden">
        {!session?.user ? (
          <Link href="/login">
            <Button
              type="button"
              title="Login"
              icon="/assets/Svg/user.svg"
              variant="btn_dark_green"
            />
          </Link>
        ) : (
          <>
            <Button
              onClick={handleLogout}
              type="button"
              title="Logout"
              icon="/assets/Svg/user.svg"
              variant="btn_dark_green"
            />
            <Link href="/stats/modals">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </>
        )}
      </div>
      {/* Updated button structure */}
      <button
        className="navbar-burger flex items-center text-blue-600 p-3 lg:hidden"
        onClick={handleToggleDropdown}>
        <Image
          src="/assets/Svg/menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="inline-block cursor-pointer"
        />
      </button>

      {dropDownMenu && (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <Link
                href="/"
                className="mr-auto text-3xl font-bold leading-none">
                <Image
                  src="/assets/Svg/r-logo.svg"
                  alt="logo"
                  width={74}
                  height={29}
                />
              </Link>
              <button className="navbar-close" onClick={handleToggleDropdown}>
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
              {/* mobile */}
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.key} className="mb-1">
                    <Link href={link.href}>
                      <div className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">
                        {link.label}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                {!session?.user ? (
                  <Link href="/login">
                    <Button
                      type="button"
                      title="Logout"
                      icon="/assets/Svg/user.svg"
                      variant="btn_dark_green"
                    />
                  </Link>
                ) : (
                  <Button
                    onClick={signOut}
                    type="button"
                    title="Logout"
                    icon="/assets/Svg/user.svg"
                    variant="btn_dark_green"
                  />
                )}
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2023</span>
              </p>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
