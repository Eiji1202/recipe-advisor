import { NextRequest, NextResponse } from "next/server";
import { db } from '@/config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { SaveRecipeType } from "@/types/cooking";

// レシピを保存
export async function POST(request: NextRequest) {
  try {
    const data: SaveRecipeType = await request.json();

    const formattedRecipeName = `${data.recipeName}（${data.servings}）`;

    const recipeData = {
      uid: data.uid,
      recipeName: formattedRecipeName,
      ingredients: data.ingredients,
      process: data.process,
      point: data.point,
      taste: data.taste,
    };

    // Firestoreにレシピを保存
    const docRef = await addDoc(collection(db, "recipes"), recipeData);

    return NextResponse.json({ message: "レシピの保存に成功しました", id: docRef.id }, { status: 200 });
  } catch (error: any) {
    console.error("レシピの保存中にエラーが発生しました", error);
    return NextResponse.json({ error: "レシピの保存に失敗しました" }, { status: 500 });
  }
}