import RecipeDetailsView from "@/components/features/RecipeDetailsView/RecipeDetailsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "レシピ詳細",
  description: "レシピの詳細です",
};

export default function RecipeDetailsPage() {
  return (
    <div className="container flex items-center justify-center py-8">
      <RecipeDetailsView />
    </div>
  );
}
