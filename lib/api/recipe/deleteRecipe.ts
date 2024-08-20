import axios from "axios";

export const deleteRecipe = async (id: string) => {
  try {
    await axios.delete(`/api/recipe/list/${id}`);
  } catch (error: any) {
    console.error("レシピの削除中にエラーが発生しました:", error);
    throw new Error("レシピの削除に失敗しました");
  }
};
