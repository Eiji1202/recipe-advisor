import { z } from "zod";

export const recipeSuggestionsSchema = z.object({
  cookingTime: z
    .string()
    .min(1, "調理時間が必要です"),
  taste: z
    .string()
    .min(1, "味のテイストが必要です"),
  ingredients: z
    .array(z.string().min(1))
    .nonempty("少なくとも1つの食材が必要です")
    .max(5, "食材は最大5つまでです"),
  seasonings: z
    .array(z.string().min(1))
    .max(5, "調味料は最大5つまでです"),
});

export type RecipeSuggestionsSchemaType = z.infer<typeof recipeSuggestionsSchema>;
