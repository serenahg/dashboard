import Link from "next/link";

const MenuDropdown = ({ submenus, visible }) => {
  return (
    <ul
      className={`  flex flex-col ${
        visible ? "h-auto" : "h-[0] "
      } overflow-hidden`}
    >
      {submenus.map((submenu, index) => (
        <li key={index} className="">
          <Link href={submenu.url}>
            <p className="text-white text-xs bg-primary-button p-2 my-2 rounded-lg ">
              {submenu.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuDropdown;
