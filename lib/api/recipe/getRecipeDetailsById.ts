import axios from "axios";

export const getRecipeDetailsById = async (id: string) => {
  try {
    const response = await axios.get(`/api/recipe/list/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("レシピ詳細の取得中にエラーが発生しました:", error);
    throw new Error("レシピ詳細の取得に失敗しました");
  }
};
