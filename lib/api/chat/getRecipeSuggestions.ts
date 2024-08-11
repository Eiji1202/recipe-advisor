import axios from "axios";
import { SuggestionsSchemaType } from "@/utils/schema/chat";

export const getRecipeSuggestions = async (requestData: SuggestionsSchemaType) => {
  try {
    const response = await axios.post("/api/chat", requestData);
    return response.data;
  } catch (error: any) {
    console.error("レシピ提案の取得中にエラーが発生しました:", error);
    throw new Error("レシピ提案の取得に失敗しました");
  }
};
