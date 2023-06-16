"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { menuItems } from "@/utils/menuItems";
import MenuDropdown from "../UI/MenuDropdown";

const Menu = () => {
  const [open, setOpen] = useState(true);

  const dr = [false, false, false, false];
  const [dropdown, setDropdown] = useState(dr);
  const modifyDropdown = (index) => {
    const dropdownCopy = [...dropdown];
    dropdownCopy[index] = !dropdownCopy[index];
    setOpen(true);
    setDropdown(dropdownCopy);
  };
  return (
    <div className=" bg-gradient-to-b from-primary-menu to-secondary-menu w-full h-full  ">
      <div className="w-full md:justify-end md:pr-4 md:pt-4 hidden md:flex justify-center p-2">
        {open ? (
          <IoMdArrowDropleftCircle
            className="text-white cursor-pointer "
            size={20}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <IoMdArrowDroprightCircle
            className="text-white cursor-pointer "
            size={20}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      <ul className="md:p-6 p-2 h-full overflow-y-auto grow">
        {menuItems.map((item, index) => {
          return (
            <li className="md:p-4 p-2 flex-1" key={item.title}>
              {item.submenu ? (
                <>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => modifyDropdown(index)}
                  >
                    {item.icon}
                    <p className="text-white text-sm hidden md:flex">
                      {open && item.title}
                    </p>
                  </button>
                  {open && (
                    <MenuDropdown
                      submenus={item.submenu}
                      visible={dropdown[index]}
                    />
                  )}
                </>
              ) : (
                <Link href={item.url}>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <p className="text-white text-sm hidden md:flex">
                      {open && item.title}
                    </p>
                  </div>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;

/*










import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineCurrencyEuro } from "react-icons/hi";
import { FaRegBuilding, FaListUl, FaRegBell } from "react-icons/fa";
import { TbFileCertificate, TbReportAnalytics } from "react-icons/tb";
import { LuShip, LuFactory } from "react-icons/lu";
import { BsGear, BsQuestionCircle } from "react-icons/bs";
import Image from "next/image";

const Menu = () => {
  return (
    <div className="h-full bg-gradient-to-b from-primary-menu to-secondary-menu ">
      <Image
        className="p-6 w-full bg-white "
        priority
        src="/logo.png"
        width={150}
        height={150}
        alt="HID Company Logo"
      />
      <div className=" scrollbar-hide scroll-auto overflow-auto ">
        <ul className="flex flex-col grow p-6">
          <li className="py-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <GiHamburgerMenu className="text-white" size={20} />
              <p className="text-white text-sm">Dashboard</p>
            </Link>
          </li>
          <li className="py-4">
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-2"
            >
              <FaRegBuilding className="text-white" size={20} />
              <p className="text-white text-sm">Projects</p>
            </Link>
          </li>
          <li className="py-4">
            <Link href="/dashboard/items" className="flex items-center gap-2">
              <FaListUl className="text-white" size={20} />
              <p className="text-white text-sm">Items</p>
            </Link>
          </li>
          <li className="py-4">
            <Link href="/dashboard/orders" className="flex items-center gap-2">
              <TbFileCertificate className="text-white" size={20} />
              <p className="text-white text-sm">Orders</p>
            </Link>
          </li>
          <li className="py-4">
            <Link
              href="/dashboard/logistics"
              className="flex items-center gap-2"
            >
              <LuShip className="text-white" size={20} />
              <p className="text-white text-sm">Logistics</p>
            </Link>
          </li>
          <li className="py-4">
            <Link href="/dashboard/reports" className="flex items-center gap-2">
              <TbReportAnalytics className="text-white" size={20} />
              <p className="text-white text-sm">Reports</p>
            </Link>
          </li>
          <li className="py-4">
            <Link
              href="/dashboard/companies"
              className="flex items-center gap-2"
            >
              <LuFactory className="text-white" size={20} />
              <p className="text-white text-sm">Companies</p>
            </Link>
          </li>
          <li className="py-4">
            <Link
              href="/dashboard/currency"
              className="flex items-center gap-2"
            >
              <HiOutlineCurrencyEuro className="text-white" size={20} />
              <p className="text-white text-sm">Currency</p>
            </Link>
          </li>
          <li className="py-4">
            <Link href="/dashboard/admin" className="flex items-center gap-2">
              <BsGear className="text-white" size={20} />
              <p className="text-white text-sm">Admin</p>
            </Link>
          </li>
          <li className="py-4">
            <Link href="/dashboard/help" className="flex items-center gap-2">
              <BsQuestionCircle className="text-white" size={20} />
              <p className="text-white text-sm">Help</p>
            </Link>
          </li>
          <li className="py-4">
            <Link href="/dashboard/profile" className="flex items-center gap-2">
              <CgProfile className="text-white" size={20} />
              <p className="text-white text-sm">Profile</p>
            </Link>
          </li>
          <li className="py-4">
            <Link
              href="/dashboard/notifications"
              className="flex items-center gap-2"
            >
              <FaRegBell className="text-white" size={20} />
              <p className="text-white text-sm">Notifications</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;

*/
