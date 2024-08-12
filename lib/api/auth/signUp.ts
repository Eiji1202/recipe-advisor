import { SignUpSchemaType } from '@/utils/schema/auth/signUp';
import axios from 'axios';

// axiosインスタンスの作成
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function signUp(data: SignUpSchemaType) {
  try {
    const response = await api.post('/api/sign-up', data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      console.error(error);
      throw new Error('新規ユーザー登録に失敗しました。');
    }
  }
}
