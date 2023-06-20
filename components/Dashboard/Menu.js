"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { menuItems } from "@/utils/menuItems";
import MenuDropdown from "../UI/MenuDropdown";
import AnimateHeight from "react-animate-height";

const Menu = () => {
  const [open, setOpen] = useState(true);
  const startingDrop = Array.from(menuItems, () => false);
  const [dropdown, setDropdown] = useState(startingDrop);
  const menuRef = useRef(null);

  const modifyDropdown = (index) => {
    const dropdownCopy = dropdown.map((value, i) =>
      i === index ? !value : false
    );
    setDropdown(dropdownCopy);
  };

  const handleToggleMenu = () => {
    setOpen(!open);
    setDropdown(startingDrop);
    console.log("open", open);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdown(startingDrop);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [startingDrop]);

  return (
    <div
      ref={menuRef}
      className={`${
        !open ? "md:w-full" : "md:w-[9.5rem]"
      } transform transition-width ease-in-out duration-500  bg-gradient-to-b from-primary-menu to-secondary-menu  h-full`}
    >
      <div
        className={`w-full justify-center hidden  ${
          !open ? "md:justify-center pt-4" : "md:justify-end md:pr-4 md:pt-4"
        }   md:flex`}
      >
        {open ? (
          <IoMdArrowDropleftCircle
            className="text-white cursor-pointer"
            size={24}
            onClick={handleToggleMenu}
          />
        ) : (
          <IoMdArrowDroprightCircle
            className="text-white cursor-pointer"
            size={24}
            onClick={handleToggleMenu}
          />
        )}
      </div>

      <ul
        className={`h-full overflow-y-auto p-2 flex flex-col justify-start items-${
          open ? "start" : "center"
        }`}
      >
        {menuItems.map((item, index) => (
          <li
            className="p-2 md:p-4 flex justify-center flex-col items-center"
            key={item.title}
          >
            {item.submenu ? (
              <>
                <button
                  aria-expanded={dropdown[index]}
                  aria-controls={`submenu-${index}`}
                  className="flex items-center "
                  onClick={() => modifyDropdown(index)}
                >
                  {item.icon}
                  <p
                    className={`text-white text-sm hidden md:flex transform transition-all ease-in-out duration-500 ${
                      open ? "pl-2 opacity:100" : "pl-0 opacity-0"
                    }`}
                  >
                    {open && item.title}
                  </p>
                </button>

                <AnimateHeight
                  id={`submenu-${index}`}
                  duration={500}
                  height={dropdown[index] ? "auto" : 0}
                >
                  <MenuDropdown submenus={item.submenu} />
                </AnimateHeight>
              </>
            ) : (
              <Link href={item.url}>
                <div className="flex items-center">
                  {item.icon}
                  <p
                    className={`text-white text-sm hidden md:flex transform transition-all ease-in-out duration-500 ${
                      open ? "pl-2 opacity:100" : "pl-0 opacity-0"
                    }`}
                  >
                    {open && item.title}
                  </p>
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
