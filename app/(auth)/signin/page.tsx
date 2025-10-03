import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import Logo from "@/public/logo.jpg";

const SignIn = () => {
  return (
    <div className="grid gap-4 p-3">
      <div className="flex gap-2 mx-auto items-center mb-5">
        <Image src={Logo} alt="Logo" width={35} height={35} />
        <h1 className="text-2xl font-bold">IMMAJ</h1>
      </div>
      <AuthForm />
    </div>
  );
};

export default SignIn;
