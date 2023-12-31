import Menu from "@/components/Dashboard/Menu";

export default function DashboardLayout({ children }) {
  return (
    <section className="relative flex flex-grow">
      <div className=" min-w-min overflow-hidden  ">
        <Menu />
      </div>
      <div className="w-full h-full overflow-auto scrollbar-hide pb-2">
        {children}
      </div>
    </section>
  );
}

//<div className="w-full max-h-screen overflow-auto scrollbar-hide">
