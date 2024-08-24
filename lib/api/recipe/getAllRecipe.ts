import axios from "axios";

export const getAllRecipe = async (uid: string) => {
  try {
    const response = await axios.post("/api/recipe/list", { uid });
    return response.data;
  } catch (error: any) {
    console.error("レシピ一覧の取得中にエラーが発生しました:", error);
    throw new Error("レシピ一覧の取得に失敗しました");
  }
};
