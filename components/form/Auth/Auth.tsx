"use client";
import React, { useEffect } from "react";
import SignUpForm from "./partials/SignUpForm";
import SignInForm from "./partials/SignInForm";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Auth = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  // ユーザーの認証情報がある場合は投稿一覧ページに置き換える
  useEffect(() => {
    if (user) {
      router.replace("/chat");
    }
  }, [user, router]);

  return (
    <div className="container flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
      <SignUpForm />
      <SignInForm />
    </div>
  );
};

export default Auth;
