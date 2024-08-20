import { SignInSchemaType } from "@/utils/schema/auth/signIn";
import axios from "axios";

export async function signIn(data: SignInSchemaType) {
  try {
    const response = await axios.post("/api/sign-in", data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      console.error(error);
      throw new Error("ログインに失敗しました。");
    }
  }
}
