"use client";
import { auth } from "@/config/firebase";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../../shadcn-ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { toast } from "../../shadcn-ui/use-toast";
import { LogOut, NotebookTabs } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const isSignedIn = !!user;

  if (!isSignedIn) {
    router.push("/");
  }

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
        <h1 className="font-bold text-lg lg:text-2xl">
          <Link href="/recipe-advisor">{siteConfig.name}</Link>
        </h1>
        {isSignedIn && (
          <ul className="flex items-center gap-3 lg:gap-6">
            <li>
              <Button
                asChild
                variant="outline"
              >
                <Link href="/recipe/list">
                  <NotebookTabs className="lg:hidden" size={16}/>
                  <span className="hidden lg:inline">レシピ一覧</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                onClick={logOut}
                variant="secondary"
              >
                <LogOut className="lg:hidden" size={16}/>
                <span className="hidden lg:inline">ログアウト</span>
              </Button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
