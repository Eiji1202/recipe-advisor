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
    } catch {
      toast({
        title: "ログアウトに失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="h-16 border-b flex items-center sticky top-0 z-10 bg-white">
      <div className="container flex items-center justify-between">
        <h1 className="font-bold text-2xl">{siteConfig.name}</h1>
        {isSignedIn && (
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/a">MENU</Link>
            </li>
            <li>
              <Link href="/b">MENU</Link>
            </li>
            <li>
              <Link href="/c">MENU</Link>
            </li>
            <li>
              <Button
                onClick={logOut}
                variant="outline"
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
