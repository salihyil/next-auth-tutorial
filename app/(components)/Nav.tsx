"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { UserButton } from "./auth/user-button";

const Nav = () => {
  const role = useCurrentRole();

  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          {role === UserRole.ADMIN && <Link href="/CreateUser">Create User</Link>}
          <Link href="/ClientMember">Client Member</Link>
          <Link href="/Member">Member</Link>
          <Link href="/Public">Public</Link>
          {role ? (
            <>
              <Link href="/settings">Change Role</Link>
              <UserButton />
            </>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;