import { Metadata } from "next";
import SuggestionsForDishNameForm from "@/components/original/pages/SuggestionsForDishNameForm";

export const metadata: Metadata = {
  title: "フォーム",
  description: "レシピを提案してもらうために、フォームに入力してください",
};

export default function RecipeAdvisorPage() {
  return (
    <div className="container flex items-center justify-center min-h-full w-full py-8">
      <SuggestionsForDishNameForm />
    </div>
  );
}
