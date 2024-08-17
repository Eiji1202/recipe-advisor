import { SignUpSchemaType } from '@/utils/schema/auth/signUp';
import axios from 'axios';

export async function signUp(data: SignUpSchemaType) {
  try {
    const response = await axios.post('/api/sign-up', data);
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
