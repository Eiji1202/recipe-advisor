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
      router.replace("/recipe-advisor");
    }
  }, [user, router]);

  return (
    <>
      <SignUpForm />
      <SignInForm />
    </>
  );
};

export default Auth;
