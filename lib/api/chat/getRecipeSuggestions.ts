import axios from "axios";
import { RecipeSuggestionsSchemaType } from "@/utils/schema/chat/recipeSuggestions";

export const getRecipeSuggestions = async (requestData: RecipeSuggestionsSchemaType) => {
  try {
    const response = await axios.post("/api/chat/recipe-suggestions", requestData);
    return response.data;
  } catch (error: any) {
    console.error("料理名の取得中にエラーが発生しました:", error);
    throw new Error("料理名の取得に失敗しました");
  }
};
