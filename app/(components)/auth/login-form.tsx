"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CardWrapper } from "@/app/(components)/auth/card-wrapper";
import { FormError } from "@/app/(components)/form-error";
import { FormSuccess } from "@/app/(components)/form-success";
import { Button } from "@/app/(components)/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(components)/ui/form";
import { Input } from "@/app/(components)/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      if (error) {
        if (error.error === "CredentialsSignin") {
          setError("Invalid email or password!");
        } else if (error.error === "OAuthAccountNotLinked") {
          setError("Email not linked to any account!");
        }
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <CardWrapper headerLabel="Welcome" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      {/*     <Button size="sm" variant="link" asChild className="px-0 font-normal">
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
          <button
            onClick={() =>
              signIn("credentials", {
                callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
                email: form.getValues().email,
                password: form.getValues().password,
              })
            }>
            Sign in
          </button>
        </form>
      </Form>
    </CardWrapper>
  );
};
