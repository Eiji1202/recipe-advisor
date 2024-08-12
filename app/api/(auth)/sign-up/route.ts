import { db, auth } from '@/config/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import bcrypt from 'bcrypt';
import { signUpSchema, SignUpSchemaType } from '@/utils/schema/auth/signUp';

// 新規ユーザー登録
export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const parsedData: SignUpSchemaType = signUpSchema.parse(data)
    const { username, email, password} = parsedData;

    // メールアドレスが既に登録されていないか確認
    const q = query(collection(db, 'users'), where('email', '==', email));
    const userSnapshot = await getDocs(q);

    if (!userSnapshot.empty) {
      return NextResponse.json({ error: '登録済みのメールアドレスです' }, { status: 409 });
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // Firebase Authでユーザー作成
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestoreにユーザーデータを保存
    await addDoc(collection(db, 'users'), {
      userId: user.uid,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    return NextResponse.json({ message: '新規ユーザー登録に成功しました' }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('ユーザー登録中にエラーが発生しました', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });;
  }
}
