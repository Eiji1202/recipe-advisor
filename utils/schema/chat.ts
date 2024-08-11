import { z } from "zod";

export const chatRequestSchema = z.object({
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
  servings: z
    .string().min(1, "何人分が必要です"),
});

export type ChatRequestSchemaType = z.infer<typeof chatRequestSchema>;
