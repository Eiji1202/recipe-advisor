import RecipeList from "@/components/original/pages/RecipeList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "レシピ一覧",
  description: "保存したレシピの一覧です",
};

export default function RecipeListPage() {
  return (
    <div className="container flex items-start justify-center min-h-full w-full py-8">
      <RecipeList />
    </div>
  );
}
