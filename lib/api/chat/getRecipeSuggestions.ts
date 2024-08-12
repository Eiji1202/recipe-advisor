import axios from "axios";
import { RecipeSuggestionsSchemaType } from "@/utils/schema/chat/recipeSuggestions";

export const getRecipeSuggestions = async (requestData: RecipeSuggestionsSchemaType) => {
  try {
    const response = await axios.post("/api/chat", requestData);
    return response.data;
  } catch (error: any) {
    console.error("レシピ提案の取得中にエラーが発生しました:", error);
    throw new Error("レシピ提案の取得に失敗しました");
  }
};
