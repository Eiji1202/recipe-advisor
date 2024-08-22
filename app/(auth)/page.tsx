import Auth from "@/components/original/pages/Auth/Auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "認証",
  description: "ログインや新規登録を行います",
};

export default function AuthPage() {
  return (
    <div className="container flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 py-8">
      <Auth />
    </div>
  );
}
