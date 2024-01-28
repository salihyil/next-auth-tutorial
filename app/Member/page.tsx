import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Member = async () => {
  /* Protecting Pages - Server Side Page */
  const session = await auth();

  if (!session) {
    //session yoksa signin yönlendir giriş yapınca /Memberdan sayfadan devam ettir.
    redirect("/auth/login?callbackUrl=/Member");
  }

  return (
    <div>
      <h1>Protecting Pages - Server Side Page - Member Server Session</h1>
      <p>name: {session?.user?.name}</p>
      <p>user email: {session?.user?.email}</p>
      <p>user role: {session?.user?.role}</p>
    </div>
  );
};

export default Member;
