import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineCurrencyEuro } from "react-icons/hi";
import { FaRegBuilding, FaListUl, FaRegBell } from "react-icons/fa";
import { TbFileCertificate, TbReportAnalytics } from "react-icons/tb";
import { LuShip, LuFactory } from "react-icons/lu";
import { BsGear, BsQuestionCircle } from "react-icons/bs";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <GiHamburgerMenu className="text-white" size={20} />,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: <TbFileCertificate className="text-white" size={20} />,
  },
  {
    title: "Items",
    url: "/dashboard/items",
    icon: <FaListUl className="text-white" size={20} />,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: <FaRegBuilding className="text-white" size={20} />,
    submenu: [
      {
        title: "Interrogation",
        url: "/dashboard/interrogation",
      },
      {
        title: "Order Processing",
        url: "/dashboard/processing",
      },
      {
        title: "Labels",
        url: "/dashboard/labels",
      },
      {
        title: "Payment Request",
        url: "/dashboard/request",
      },
    ],
  },
  {
    title: "Logistics",
    url: "/dashboard/logistics",
    icon: <LuShip className="text-white" size={20} />,
    submenu: [
      {
        title: "Daeliveries",
        url: "/deliveries",
      },
      {
        title: "Shipping",
        url: "shipping",
      },
      {
        title: "Invoice/Docs",
        url: "invoices",
      },
    ],
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: <TbReportAnalytics className="text-white" size={20} />,
  },
  {
    title: "Companies",
    url: "/dashboard/companies",
    icon: <LuFactory className="text-white" size={20} />,
  },
  {
    title: "Currency",
    url: "/dashboard/currency",
    icon: <HiOutlineCurrencyEuro className="text-white" size={20} />,
  },
  {
    title: "Admin",
    url: "/dashboard/admin",
    icon: <BsGear className="text-white" size={20} />,
  },
  {
    title: "Help",
    url: "/dashboard/help",
    icon: <BsQuestionCircle className="text-white" size={20} />,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: <CgProfile className="text-white" size={20} />,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: <FaRegBell className="text-white" size={20} />,
  },
];
