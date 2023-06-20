"use client";
import Link from "next/link";
import React, { useState } from "react";

const MenuDropdown = ({ submenus }) => {
  return (
    <ul className={`  flex flex-col overflow-hidden `}>
      {submenus.map((submenu, index) => (
        <li key={index} className="">
          <Link href={submenu.url}>
            <p className=" text-xs text-primary-menu font-medium bg-terciary-button p-2 my-2 rounded-lg ">
              {submenu.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuDropdown;
