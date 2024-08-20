import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { SaveRecipeType as  RecipeDetailsType} from "@/types/cooking";

// レシピ詳細の取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "レシピ詳細が見つかりませんでした" }, { status: 404 });
    }

    const recipeDetails = docSnap.data();

    return NextResponse.json(recipeDetails as RecipeDetailsType);
  } catch (error: any) {
    console.error("レシピ詳細の取得中にエラーが発生しました:", error);
    return NextResponse.json({ error: "レシピ詳細の取得に失敗しました" }, { status: 500 });
  }
}

// レシピの削除
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const docRef = doc(db, "recipes", id);

    // ドキュメントを削除
    await deleteDoc(docRef);

    return NextResponse.json({ message: "レシピの削除に成功しました" }, { status: 200 });
  } catch (error: any) {
    console.error("レシピの削除中にエラーが発生しました:", error);
    return NextResponse.json({ error: "レシピの削除に失敗しました" }, { status: 500 });
  }
}
