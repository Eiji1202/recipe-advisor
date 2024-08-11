import { Metadata } from "next";
import SuggestionsForm from "@/components/form/SuggestionsForm/SuggestionsForm";

export const metadata: Metadata = {
  title: "Form",
  description: "レシピを提案してもらうために、フォームに入力してください。",
};

export default function RecipeAdvisorPage() {
  return (
    <div className="container flex items-center justify-center">
      <SuggestionsForm />
    </div>
  );
}
