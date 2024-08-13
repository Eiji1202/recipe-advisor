import axios from "axios";
import { RecipeDetailsSchemaType } from "@/utils/schema/chat/recipeDetails";

export const getRecipeDetails = async (requestData: RecipeDetailsSchemaType) => {
  try {
    const response = await axios.post("/api/chat/recipe-details", requestData);
    return response.data;
  } catch (error: any) {
    console.error("レシピの取得中にエラーが発生しました:", error);
    throw new Error("レシピの取得に失敗しました");
  }
};
