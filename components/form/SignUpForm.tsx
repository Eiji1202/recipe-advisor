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
import { SignUpSchemaType, signUpSchema } from "@/utils/schema/signUp";
import { signUp } from "@/lib/api/signUp";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { toast } from "../ui/use-toast";

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const result = await signUp(data);
      // eslint-disable-next-line no-console
      console.log("新規ユーザー登録成功:", result);
      toast({
        title: "新規ユーザー登録に成功しました",
      });
      router.push("/chat");
    } catch (error: any) {
      toast({
        title: "新規ユーザー登録に失敗しました",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full lg:p-6">
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
                        placeholder="ユーザー名を入力してください"
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
                variant="success"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  "登録"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
