import { Metadata } from "next";
import RecipeInput from "@/components/form/RecipeInput/RecipeInput";

export const metadata: Metadata = {
  title: "Form",
  description: "レシピを提案してもらうために、フォームに入力してください。",
};

export default function RecipeAdvisorPage() {
  return (
    <div className="container flex items-center justify-center">
      <RecipeInput />
    </div>
  );
}
