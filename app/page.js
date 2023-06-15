import ForgotEmail from "@/components/Login/ForgotEmail";
import LoginForm from "@/components/Login/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="md:flex h-screen justify-around">
      <div className="md:w-1/3 w-full">
        <div className="relative w-24 h-24  left-5">
          <Image
            priority
            src="/logo.png"
            fill
            alt="HID Company Logo"
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw"
          />
        </div>
      </div>

      <div className="flex flex-col px-10 w-full md:w-2/3 md:h-full h-3/4">
        <LoginForm />
        <ForgotEmail />
      </div>
    </main>
  );
}
