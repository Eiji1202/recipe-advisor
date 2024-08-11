import Chat from "@/components/features/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "フォームの入力内容を元に、レシピを提案してもらうページです。",
};

export default function SuggestionsPage() {
  return (
    <div className="container flex items-center justify-center">
      <Chat />
    </div>
  );
}
