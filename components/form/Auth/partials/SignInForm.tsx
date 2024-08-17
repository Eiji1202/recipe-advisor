"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import Image from "next/image";
import { SignInSchemaType, signInSchema } from "@/utils/schema/auth/signIn";
import { signIn } from "@/lib/api/auth/signIn";
import { useRouter } from "next/navigation";
import { toast } from "../../../ui/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Loader } from "lucide-react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const SignInForm = () => {
  const router = useRouter();
  const [signInWithGoogle, loading] = useSignInWithGoogle(auth);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = form;

  // ログイン
  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    try {
      await signIn(data);
      toast({
        title: "ログインに成功しました",
      });
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/recipe-advisor");
    } catch (error: any) {
      toast({
        title: "ログインに失敗しました",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Googleでログイン
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "ログインに成功しました",
      });
      router.push("/recipe-advisor");
    } catch (error: any) {
      toast({
        title: "ログインに失敗しました",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full lg:p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-lg lg:text-2xl">ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 lg:space-y-6">
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
              >
                {isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>ログイン</>
                )}
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
              disabled={!!loading}
              onClick={handleGoogleSignIn}
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
