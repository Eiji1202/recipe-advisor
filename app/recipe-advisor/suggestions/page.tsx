import Chat from "@/components/original/pages/Chat/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "レシピ提案",
  description: "フォームの入力内容を元に、レシピを提案してもらいます",
};

export default function SuggestionsPage() {
  return (
    <div className="container flex items-center justify-center min-h-full w-full py-8">
      <Chat />
    </div>
  );
}
