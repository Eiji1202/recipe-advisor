import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { recipeDetailsSchema, RecipeDetailsSchemaType } from "@/utils/schema/chat/recipeDetails";
import { RecipeDetails } from "@/types/cooking";

// 2回目のリクエスト: 料理の詳細を取得
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData: RecipeDetailsSchemaType = recipeDetailsSchema.parse(body);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: 'system', content: 'あなたは役に立つアシスタントです。' },
          { role: 'user', content: generatePromptForRecipeDetails(parsedData) },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const parsedContent: RecipeDetails = parseRecipeDetailsContent(content);

    return NextResponse.json({ parsedContent });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

// プロンプトを生成する関数
const generatePromptForRecipeDetails = (data: RecipeDetailsSchemaType) => {
  return `
  私は${data.servings}分の${data.recipeName}のレシピが知りたいです。以下のフォーマットで詳細を教えてください。

  ### 料理名
  - ${data.recipeName}

  ### 材料（${data.servings}分）
  - 各材料のリスト:数量または分量（数量または分量は日本語の単位を使用し、tablespoonsなど英語の単位は使用しないでください）

  ### 手順
  1. 調理の手順を箇条書きにしてください。

  ### ひとこと
  - その他、注意などがあれば記載してください。

  必ず上記のフォーマットに従って、わかりやすく返答してください。
  `;
};


// レスポンスをパースして適切な形式に変換する関数
const parseRecipeDetailsContent = (content: string) => {
  const sections = content.split("###").map(section => section.trim());

  let recipeName: RecipeDetails["recipeName"] = "";
  let ingredients: RecipeDetails["ingredients"] = [];
  let process: RecipeDetails["process"] = [];
  let point: RecipeDetails["point"] = "";

  sections.forEach(section => {
    if (section.startsWith("料理名")) {
      const lines = section.split("\n").filter(Boolean);
      recipeName = lines[1].replace("- ", "").trim();
    }

    if (section.startsWith("材料")) {
      const lines = section.split("\n").filter(Boolean).slice(1);
      ingredients = lines.map(line => {
        const [name, quantity] = line.split(":").map(item => item.trim());
        return { name: name.replace(/^- /, "").trim() , quantity };
      });
    }

    if (section.startsWith("手順")) {
      const lines = section.split("\n").filter(Boolean).slice(1);
      process = lines.map(line => line.replace(/^\d+\.\s*/, "").trim());
    }

    if (section.startsWith("ひとこと")) {
      point = section.split("\n").slice(1).join(" ").replace(/^- /, "").trim();
    }
  });

  return {
    recipeName,
    ingredients,
    process,
    point,
  };
};