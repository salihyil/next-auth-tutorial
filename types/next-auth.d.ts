import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: { role?: any } & DefaultUser;
  }
  interface User extends DefaultUser {
    role: string;
  }
}
