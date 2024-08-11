import { z } from "zod";

export const recipeInputSchema = z.object({
  cookingTime: z
    .enum(["10分以内", "20分以内", "30分以内", "それ以上"])
    .optional(),
  taste: z
    .enum(["和風", "洋風", "中華風", "韓国風", "エスニック風"])
    .optional(),
  ingredients: z
    .array(z.object({
      ingredient: z.string().min(1, "食材を入力してください")
    }))
    .nonempty("少なくとも1つの食材を入力してください")
    .max(5, "食材は最大5つまでです"),
  seasonings: z
    .array(z.object({
      seasoning: z.string().optional()
    }))
    .max(5, "調味料は最大5つまでです")
    .optional(),
  servings: z
    .enum(["1人前", "2人前", "3人前", "4人前", "5人前", "6人前", "7人前", "8人前", "9人前", "10人前"])
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

export type CookingTime = "10分以内" | "20分以内" | "30分以内" | "それ以上";
export type Taste = "和風" | "洋風" | "中華風" | "韓国風" | "エスニック風";
export type Servings = "1人前" | "2人前" | "3人前" | "4人前" | "5人前" | "6人前" | "7人前" | "8人前" | "9人前" | "10人前";
