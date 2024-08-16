export type CookingTime = "10分以内" | "20分以内" | "30分以内" | "それ以上";
export type Taste = "和風" | "洋風" | "中華風" | "韓国風" | "エスニック風";
export type Servings = | "1人前" | "2人前" | "3人前" | "4人前" | "5人前" | "6人前" | "7人前" | "8人前" | "9人前" | "10人前";

type Ingredient = {
  name: string;
  quantity: string;
};

export type RecipeDetails = {
  recipeName: string;
  ingredients: Ingredient[];
  process: string[];
  point: string;
  // imageUrl: string; // TODO: 画像生成の実装を復活させる場合コメントアウト解除
};
