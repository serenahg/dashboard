import Menu from "@/components/Dashboard/Menu";

export default function DashboardLayout({ children }) {
  return (
    <section className="relative flex flex-grow">
      <div className="w-1/12 min-w-min overflow-hidden  ">
        <Menu />
      </div>
      <div className="overflow-auto w-full ">{children}</div>
    </section>
  );
}
