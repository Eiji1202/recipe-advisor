import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { suggestionsSchema, SuggestionsSchemaType } from "@/utils/schema/chat";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // リクエストデータのバリデーション
    const parsedData: SuggestionsSchemaType = suggestionsSchema.parse(body);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: 'system', content: 'あなたは役に立つアシスタントです。' },
          { role: 'user', content: generatePrompt(parsedData) },
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

    // レスポンスのコンテンツを取得し、カンマで分割して配列に変換
    const content = response.data.choices[0].message.content;

    const recipeNames = content.split(',').map((item: string) => item.trim()).filter(Boolean);

    return NextResponse.json(recipeNames);
  } catch (error: any) {
    console.error("APIエラー:", error.response ? error.response.data : error);
    return NextResponse.json(
      { error: error.message || "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

// プロンプトを生成する関数
const generatePrompt = (data: SuggestionsSchemaType) => {
  const { cookingTime, taste, ingredients, seasonings } = data;

  let prompt = `私は${cookingTime}で作れる${taste}の料理を探しています。以下の食材を使用してください: ${ingredients.join(", ")}。`;

  if (seasonings.length > 0) {
    prompt += ` また、以下の調味料を使用してください: ${seasonings.join(", ")}。`;
  }

  prompt += ` 異なる3つの料理名だけをカンマ区切りで提案してください。料理名のみです。`

  return prompt;
};
