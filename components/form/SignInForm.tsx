"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { SignInFormType, signInSchema } from "@/utils/schema/signIn";

const SignInForm = () => {
  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInFormType> = (data) => {
    console.log(data);
  };

  return (
    <Card className="w-full lg:p-6">
      <CardHeader>
        <CardTitle className="text-lg lg:text-2xl text-center">
          ログイン
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 lg:space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-lg">メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="メールアドレスを入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-lg">パスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="パスワードを入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center mt-6 lg:mt-8">
              <Button
                type="submit"
                className="w-full lg:w-1/2 lg:text-lg rounded-full"
              >
                ログイン
              </Button>
            </div>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">または</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center">
            <Button
              className="w-full lg:w-1/2 lg:text-lg rounded-full flex items-center gap-2"
              variant="outline"
            >
              <Image
                src="google.svg"
                alt="sign in for google"
                width={20}
                height={20}
              />
              Googleでログイン
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;