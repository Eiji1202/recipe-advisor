import RecipeList from "@/components/features/RecipeList/RecipeList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RecipeList",
  description: "保存したレシピの一覧です。",
};

export default function RecipeListPage() {
  return (
    <div className="container flex items-center justify-center py-8">
      <RecipeList />
    </div>
  );
}
