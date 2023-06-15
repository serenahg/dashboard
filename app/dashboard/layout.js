import Menu from "@/components/Dashboard/Menu";

export default function DashboardLayout({ children }) {
  return (
    <section className="w-screen h-screen flex">
      <Menu />
      {children}
    </section>
  );
}
