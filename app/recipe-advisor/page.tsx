import { Metadata } from "next";
import SuggestionsForDishNameForm from "@/components/form/SuggestionsForDishNameForm";

export const metadata: Metadata = {
  title: "Form",
  description: "レシピを提案してもらうために、フォームに入力してください。",
};

export default function RecipeAdvisorPage() {
  return (
    <div className="container flex items-center justify-center py-8">
      <SuggestionsForDishNameForm />
    </div>
  );
}
