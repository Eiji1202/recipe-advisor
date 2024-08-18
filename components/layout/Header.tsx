"use client";
import { auth } from "@/config/firebase";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { toast } from "../ui/use-toast";

const Header = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const isSignedIn = !!user;

  const logOut = async () => {
    const isConfirmed = window.confirm("ログアウトしますか？");
    if (!isConfirmed) return;

    try {
      await signOut(auth);
      toast({
        title: "ログアウトしました",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "ログアウトに失敗しました",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="h-16 border-b flex items-center sticky top-0 z-10 bg-white">
      <div className="container flex items-center justify-between">
        <h1 className="font-bold text-2xl">
          <Link href="/recipe-advisor">{siteConfig.name}</Link>
        </h1>
        {isSignedIn && (
          <ul className="flex items-center gap-4 lg:gap-6">
            <li>
              <Link href="/recipe/list">レシピ一覧</Link>
            </li>
            <li>
              <Button
                onClick={logOut}
                variant="secondary"
              >
                ログアウト
              </Button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
