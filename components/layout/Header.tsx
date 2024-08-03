import { siteConfig } from "@/config/site";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-16 border-b flex items-center sticky top-0 z-10 bg-white">
      <div className="container flex items-center justify-between">
        <h1 className="font-bold text-2xl">{siteConfig.name}</h1>
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
