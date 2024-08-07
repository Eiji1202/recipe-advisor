import { z } from "zod";

export const recipeInputSchema = z.object({
  cookingTime: z
    .enum(["1", "2", "3", "4"])
    .optional(),
  taste: z
    .enum(["1", "2", "3", "4", "5"])
    .optional(),
  ingredients: z
    .array(z.object({
      ingredient: z.string().min(1, "食材を入力してください")
    })),
  seasonings: z
    .array(z.object({
      seasoning: z.string().optional()
    }))
    .optional(),
  servings: z
    .enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
    .optional(),
}).refine(data => data.cookingTime !== undefined, {
  message: "調理時間を選択してください",
  path: ["cookingTime"],
}).refine(data => data.taste !== undefined, {
  message: "味のテイストを選択してください",
  path: ["taste"],
}).refine(data => data.servings !== undefined, {
  message: "何人分を選択してください",
  path: ["servings"],
});

export type RecipeInputSchemaType = z.infer<typeof recipeInputSchema>;

export type CookingTime = "1" | "2" | "3" | "4";
export type Taste = "1" | "2" | "3" | "4" | "5";
export type Servings = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
