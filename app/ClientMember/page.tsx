"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Member = () => {
  // Protecting Pages - Client Side Page
  // use session must be wrapped in a <SectionProvider/>

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });

  return (
    <div>
      <h1>Protecting Pages - Client Side Page - Member Client Session</h1>
      <p>user email: {session?.user?.email}</p>
      <p>user role: {session?.user?.role}</p>
    </div>
  );
};

export default Member;
