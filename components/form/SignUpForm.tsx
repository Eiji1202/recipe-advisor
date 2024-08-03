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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const schema = z.object({
  username: z
    .string()
    .min(1, "ユーザー名を入力してください")
    .max(20, "ユーザー名は20文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .refine((val) => val.length >= 8, {
      message: "パスワードは8文字以上で入力してください",
    })
    .refine((val) => /^[a-zA-Z\d]+$/.test(val), {
      message: "パスワードは半角英数で入力してください",
    }),
});

type SignUpFormValues = z.infer<typeof schema>;

const SignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
  };
  return (
    <Card className="w-full max-w-[800px] lg:p-6">
      <CardHeader>
        <CardTitle className="text-lg lg:text-2xl text-center">
          新規ユーザー登録
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 lg:space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-lg">ユーザー名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ユーザー名"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.username?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-lg">メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="メールアドレス"
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
                        placeholder="パスワード"
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
                className="w-full lg:w-1/2 lg:text-lg"
              >
                登録
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
