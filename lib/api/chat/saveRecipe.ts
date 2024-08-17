import { auth } from "@/config/firebase";
import { SaveRecipeType } from "@/types/cooking";
import axios from "axios";

// レシピを保存する
export const saveRecipe = async (data: SaveRecipeType): Promise<void> => {
  try {
    await axios.post("/api/chat/recipe-details/save", data);
  } catch (error: any) {
    console.error("Failed to save recipe", error);
    throw new Error("Failed to save recipe");
  }
};
