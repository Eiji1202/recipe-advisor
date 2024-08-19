import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "レシピ詳細が見つかりませんでした" }, { status: 404 });
    }

    const recipeDetails = docSnap.data();

    return NextResponse.json(recipeDetails);
  } catch (error: any) {
    console.error("レシピ詳細の取得中にエラーが発生しました:", error);
    return NextResponse.json({ error: "レシピ詳細の取得に失敗しました" }, { status: 500 });
  }
}
