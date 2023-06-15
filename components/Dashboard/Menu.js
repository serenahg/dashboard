import Link from "next/link";
import React from "react";

const Menu = () => {
  return (
    <div className="bg-blue-600 min-w-min p-6">
      <ul>
        <li>
          <Link href="/dashboard">
            <p className="text-white">Dashboard</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/projects">
            <p className="text-white">Projects</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/orders">
            <p className="text-white">Orders</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/items">
            <p className="text-white">Items</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
