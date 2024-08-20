import { db } from "@/config/firebase";
import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcrypt";
import { signInSchema, SignInSchemaType } from "@/utils/schema/auth/signIn";

// ログイン
export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const parsedData: SignInSchemaType = signInSchema.parse(data);
    const { email, password } = parsedData;

    // ユーザー情報を取得
    const q = query(collection(db, "users"), where("email", "==", email));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // パスワードを検証
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ error: "パスワードが一致しません" }, { status: 401 });
    };

    return NextResponse.json({ message: "ログイン成功"}, {status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
