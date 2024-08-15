"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import { RecipeSuggestionsSchemaType } from "@/utils/schema/chat/recipeSuggestions";
import { getRecipeSuggestions } from "@/lib/api/chat/getRecipeSuggestions";
import { toast } from "../../ui/use-toast";
import { Loader } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { getRecipeDetails } from "@/lib/api/chat/getRecipeDetails";
import {
  CookingTime,
  RecipeDetails as RecipeDetailsType,
  Servings,
  Taste,
} from "@/types/cooking";
import { RecipeDetailsSchemaType } from "@/utils/schema/chat/recipeDetails";
import RecipeSuggestions from "./partials/RecipeSuggestions";
import { RecipeDetails } from "./partials/RecipeDetails";

export type SelectRecipeType = {
  selectRecipe: string;
};

const defaultValues = {
  selectRecipe: "",
};

const Chat: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cookingTime = searchParams.get("cookingTime") as CookingTime;
  const taste = searchParams.get("taste") as Taste;
  const ingredients = searchParams.get("ingredients") as string;
  const seasonings = searchParams.get("seasonings") as string;
  const servings = searchParams.get("servings") as Servings;
  const [recipes, setRecipes] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<RecipeDetailsType | null>(null);
  const [step, setStep] = useState<number>(1);

  const form = useForm<SelectRecipeType>({
    defaultValues,
  });

  useEffect(() => {
    setIsLoading(true);
    // 必須のクエリパラメータが不足している場合、前のページに戻る
    if (!cookingTime || !taste || !ingredients || !servings) {
      router.back();
      return;
    }

    // クエリパラメータを適切な形式に変換する
    const ingredientsArray = ingredients.split(",");
    const seasoningsArray = seasonings ? seasonings.split(",") : [];

    const suggestionsRequestData: RecipeSuggestionsSchemaType = {
      cookingTime,
      taste,
      ingredients: ingredientsArray as [string, ...string[]],
      seasonings: seasoningsArray,
    };

    // レシピ提案を取得
    const fetchRecipeSuggestions = async () => {
      try {
        const response = await getRecipeSuggestions(suggestionsRequestData);
        setRecipes(response);
      } catch (error: any) {
        toast({
          title: "料理の取得に失敗しました",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeSuggestions();
  }, [cookingTime, taste, ingredients, seasonings, servings, router]);

  // 料理を選択してレシピを取得
  const onSubmit: SubmitHandler<SelectRecipeType> = async (data) => {
    setIsLoading(true);
    setStep(2);
    const detailsRequestData: RecipeDetailsSchemaType = {
      recipeName: data.selectRecipe,
      servings,
    };

    try {
      const response = await getRecipeDetails(detailsRequestData);
      setDetails(response.recipeDetails);
    } catch (error: any) {
      toast({
        title: "レシピの取得に失敗しました",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="relative w-full max-w-[800px] min-h-[320px] lg:p-6">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center gap-2 text-muted-foreground">
          <Loader
            className="animate-spin"
            size={20}
          />
          {step === 1 && <p>料理を取得中...</p>}
          {step === 2 && <p>レシピを取得中...</p>}
        </div>
      )}
      {step === 1 && recipes && (
        <FormProvider {...form}>
          <RecipeSuggestions
            onSubmit={() =>
              onSubmit({ selectRecipe: form.getValues().selectRecipe })
            }
            recipes={recipes}
          />
        </FormProvider>
      )}
      {step === 2 && details && (
        <RecipeDetails
          details={details}
          servings={servings}
        />
      )}
    </Card>
  );
};

export default Chat;
