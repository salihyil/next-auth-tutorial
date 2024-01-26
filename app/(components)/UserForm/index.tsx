"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ZodError } from "zod";
import { formDataSchema } from "@/app/(components)/UserForm/schema";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const UserForm = () => {
  const initialFormData: FormData = {
    name: "",
    email: "",
    password: "",
  };
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = formDataSchema.parse(formData);
      setFormErrors({});

      const res = await fetch("/api/Users", {
        method: "POST",
        body: JSON.stringify({ formData: validatedData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const response = await res.json();
        setFormErrors(response.errors || {});
      } else {
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
      <h1>Create New User</h1>
      <label>Full Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={handleChange}
        value={formData.name}
        className={`m-2 bg-slate-400 rounded  ${formErrors.name ? "border border-red-500" : ""}`}
      />
      {formErrors.name && <p className="mx-2 text-red-500">{formErrors.name}</p>}

      <label>Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={handleChange}
        value={formData.email}
        className={`m-2 bg-slate-400 rounded  ${formErrors.email ? "border border-red-500" : ""}`}
      />
      {formErrors.email && <p className="mx-2 text-red-500">{formErrors.email}</p>}

      <label>Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        value={formData.password}
        className={`m-2 bg-slate-400 rounded  ${
          formErrors.password ? "border border-red-500" : ""
        }`}
      />
      {formErrors.password && <p className="mx-2 text-red-500">{formErrors.password}</p>}

      <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100" />
    </form>
  );
};

export default UserForm;
