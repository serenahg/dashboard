import Menu from "@/components/Dashboard/Menu";

export default function DashboardLayout({ children }) {
  return (
    <section className="relative flex flex-grow">
      <div className=" min-w-min overflow-hidden  ">
        <Menu />
      </div>
      <div className="overflow-auto w-full max-h-screen">{children}</div>
    </section>
  );
}
