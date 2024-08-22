"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { SignUpSchemaType, signUpSchema } from "@/utils/schema/auth/signUp";
import { signUp } from "@/lib/api/auth/signUp";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { toast } from "@/components/shadcn-ui/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      await signUp(data);
      toast({
        title: "新規ユーザー登録に成功しました",
      });
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/recipe-advisor");
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
      <CardHeader className="text-center">
        <CardTitle className="text-lg lg:text-2xl">新規ユーザー登録</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 lg:space-y-6">
              <FormField
                control={control}
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
                    <FormMessage>{errors.username?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
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
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
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
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center mt-6 lg:mt-8">
              <Button
                type="submit"
                className="w-full lg:w-1/2 lg:text-lg rounded-full"
                variant="success"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader className="animate-spin" /> : <>登録</>}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
