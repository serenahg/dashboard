import ForgotEmail from "@/components/Login/ForgotEmail";
import LoginForm from "@/components/Login/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-around items-center pt-20 gap-40">
      <LoginForm />
      <ForgotEmail />
    </main>
  );
}
