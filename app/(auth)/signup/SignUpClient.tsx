"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { AiOutlineGoogle } from "react-icons/ai";
import Button from "@/app/_components/ui/Button";
import Heading from "@/app/_components/ui/Heading";
import Input from "@/app/_components/ui/Input";
import Link from "next/link";
import { User } from "@prisma/client";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  user: User | null;
}

const SignUpClient: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password1: "", password2: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const { password1, password2 } = data;

    if (password1 !== password2) {
      return toast.error("Passwords are not matching");
    }

    axios
      .post("/api/auth/signup", data)
      .then((res) => {
        toast.success("New user is created.");
        router.push("/signin");
      })
      .catch((error) => {
        toast.error(error.info);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      router.push("/");
      router.refresh();
    }
  }, [router, user]);

  if (user) {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Heading title="Register" center />
      <Button
        label="Continue with Google"
        icon={AiOutlineGoogle}
        outline
        onClick={() => {
          setIsLoading(true);

          signIn("google", { redirect: false })
            .then((callback) => {
              if (callback?.ok) {
                toast.success("Signed in with Google.");
                router.push("/dashboard");
                router.refresh();
              }
            })
            .catch((error) => {
              console.log(error);
              toast.error("Sign in error.");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      />
      <Input
        label="Name"
        id="name"
        register={register}
        control={control}
        errors={errors}
        required
        disabled={isLoading}
      />
      <Input
        label="Email"
        id="email"
        type="email"
        register={register}
        control={control}
        errors={errors}
        required
        disabled={isLoading}
      />
      <Input
        label="Password"
        id="password1"
        type="password"
        register={register}
        control={control}
        errors={errors}
        required
        disabled={isLoading}
      />
      <Input
        label="Re-enter Password"
        id="password2"
        type="password"
        register={register}
        control={control}
        errors={errors}
        required
        disabled={isLoading}
      />
      <Button
        label={isLoading ? "Signing Up..." : "Sign Up"}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm text-slate-700">
        Already have an account?{" "}
        <Link href="/signin" className="underline">
          Sign in
        </Link>
        .
      </p>
    </>
  );
};

export default SignUpClient;
