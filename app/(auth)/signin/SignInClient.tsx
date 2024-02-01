"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { AiOutlineGoogle } from "react-icons/ai";
import Button from "@/app/_components/ui/Button";
import Heading from "@/app/_components/ui/Heading";
import Input from "@/app/_components/ui/Input";
import Link from "next/link";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  user: User | null;
}

const SignInClient: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/");
          router.refresh();
          return toast.success("Signed in.");
        }

        if (callback?.error) {
          if (callback.status === 401)
            return toast.error("Invalid email or passsword.");
        }
      })
      .catch((error) => {
        return toast.error(error.message);
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
      <Heading title="Welcome Back!" center />
      <Button
        label="Continue with Google"
        icon={AiOutlineGoogle}
        outline
        onClick={() => {
          setIsLoading(true);

          signIn("google", { redirect: false })
            .then((callback) => {
              if (callback?.ok) {
                toast.success("Signed in with Google");
                router.push("/dashboard");
              }

              if (callback?.error) {
                toast.error(callback.error);
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
        label="Email"
        type="email"
        id="email"
        control={control}
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        label="Password"
        type="password"
        id="password"
        control={control}
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Button
        label={isLoading ? "Signing In..." : "Sign In"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm text-slate-700">
        Not registered yet?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
        .
      </p>
    </>
  );
};

export default SignInClient;
