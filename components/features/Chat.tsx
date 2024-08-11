"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChatRequestSchemaType } from "@/utils/schema/chat";
import { suggestionsRecipe } from "@/lib/api/suggestionsRecipe";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

type SelectedRecipeType = {
  selectRecipe: string;
};

const defaultValues = {
  selectRecipe: "",
};

const Chat: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cookingTime = searchParams.get("cookingTime") as string;
  const taste = searchParams.get("taste") as string;
  const ingredients = searchParams.get("ingredients") as string;
  const seasonings = searchParams.get("seasonings") as string;
  const servings = searchParams.get("servings") as string;
  const [recipes, setRecipes] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SelectedRecipeType>({
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

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

    const requestData: ChatRequestSchemaType = {
      cookingTime,
      taste,
      ingredients: ingredientsArray as [string, ...string[]],
      seasonings: seasoningsArray,
      servings,
    };

    // レシピ提案を取得
    const fetchRecipeSuggestions = async () => {
      try {
        const response = await suggestionsRecipe(requestData);
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

  const onSubmit: SubmitHandler<SelectedRecipeType> = (data) => {
    console.log(data);
  };

  return (
    <Card className="relative w-full max-w-[800px] min-h-[320px] lg:p-6">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center gap-2 text-muted-foreground">
          <Loader
            className="animate-spin"
            size={20}
          />
          <p>料理を取得中...</p>
        </div>
      )}
      {recipes && (
        <>
          <CardHeader>
            <CardTitle className="text-lg lg:text-2xl text-center">
              料理を決定する
            </CardTitle>
            <CardDescription className="text-center">
              以下から作る料理を選択してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:max-w-[500px] mx-auto"
              >
                <FormField
                  control={control}
                  name="selectRecipe"
                  rules={{ required: "料理を選択してください" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-col gap-4 border border-gray-300 rounded-lg p-4"
                        >
                          {recipes.map((recipe, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <RadioGroupItem
                                value={recipe}
                                id={`recipe-${index}`}
                              />
                              <Label
                                htmlFor={`recipe-${index}`}
                                className="font-semibold lg:text-lg"
                              >
                                {recipe}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>{errors.selectRecipe?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex justify-center mt-6 lg:mt-8">
                  <Button
                    type="submit"
                    className="w-full lg:w-1/2 lg:text-lg rounded-full"
                  >
                    決定する
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Chat;
