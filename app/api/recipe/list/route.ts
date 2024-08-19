import { NextRequest, NextResponse } from "next/server";
import { db } from '@/config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { RecipeListType, SaveRecipeType } from "@/types/cooking";

export async function GET(request: NextRequest) {
  try {
    const uid = request.nextUrl.searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "uidが見つかりません" }, { status: 400 });
    }

    const q = query(collection(db, "recipes"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const recipes: RecipeListType = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as SaveRecipeType
    }));

    return NextResponse.json(recipes);
  } catch (error: any) {
    console.error("レシピ一覧の取得中にエラーが発生しました", error);
    return NextResponse.json({ error: "レシピ一覧の取得に失敗しました" }, { status: 500 });
  }
}
