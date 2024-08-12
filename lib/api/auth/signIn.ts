import { SignInSchemaType } from '@/utils/schema/auth/signIn';
import axios from 'axios';

// axiosインスタンスの作成
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function signIn(data: SignInSchemaType) {
  try {
    const response = await api.post('/api/sign-in', data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      console.error(error);
      throw new Error('ログインに失敗しました。');
    }
  }
}
