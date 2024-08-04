import { z } from "zod";


export const signUpSchema = z.object({
  username: z
    .string()
    .min(1, "ユーザー名を入力してください")
    .max(20, "ユーザー名は20文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .refine((val) => val.length >= 8, {
      message: "パスワードは8文字以上で入力してください",
    })
    .refine((val) => /^[a-zA-Z\d]+$/.test(val), {
      message: "パスワードは半角英数で入力してください",
    }),
});

export type SignUpFormType = z.infer<typeof signUpSchema>;
