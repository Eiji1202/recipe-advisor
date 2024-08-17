import Chat from "@/components/features/Chat/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "フォームの入力内容を元に、レシピを提案してもらいます。",
};

export default function SuggestionsPage() {
  return (
    <div className="container flex items-center justify-center py-8">
      <Chat />
    </div>
  );
}
