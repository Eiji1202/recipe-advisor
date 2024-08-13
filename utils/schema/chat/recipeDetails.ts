import { z } from "zod";

export const recipeDetailsSchema = z.object({
  recipeName: z
    .string().min(1, "料理名を選択してください"),
  servings: z
    .enum(["1人前", "2人前", "3人前", "4人前", "5人前", "6人前", "7人前", "8人前", "9人前", "10人前"])
});

export type RecipeDetailsSchemaType = z.infer<typeof recipeDetailsSchema>;
