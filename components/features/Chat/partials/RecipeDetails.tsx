"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecipeDetailsTypeForChat } from "@/types/cooking";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
// import Image from "next/image";

type Props = {
  details: RecipeDetailsTypeForChat;
  servings: string;
  isSaving: boolean;
  isSaved: boolean;
  onSubmit: () => void;
};

export const RecipeDetails: React.FC<Props> = (data) => {
  const { details, servings, isSaving, isSaved, onSubmit } = data;

  const router = useRouter();

  const handleBack = () => {
    router.push("/recipe-advisor");
  };

  const getLabel = () => {
    switch (true) {
      case isSaving:
        return <Loader className="animate-spin" />;
      case isSaved:
        return <>保存済み</>;
      default:
        return <>レシピを保存する</>;
    }
  };

  const buttonLabel = getLabel();

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-lg lg:text-2xl">
          {details.recipeName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/** TODO: 画像生成の実装を復活させる場合コメントアウト解除 */}
        {/* <Image
          src={details.imageUrl}
          alt={details.recipeName}
          width={512}
          height={512}
          className="w-full h-auto object-cover rounded-xl"
        /> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>材料</TableHead>
              <TableHead>分量（{`${servings}`}）</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details.ingredients.map((ingredient, index) => (
              <TableRow key={index}>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell>{ingredient.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-2 space-y-2">
          <p className="font-semibold lg:text-lg">手順</p>
          <ul className="space-y-4">
            {details.process.map((step, index) => (
              <li
                key={index}
                className="flex items-start lg:items-center gap-2 lg:gap-4"
              >
                <span className="bg-muted p-2 rounded-full w-7 h-7 flex items-center justify-center">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-2 space-y-2">
          <p className="font-semibold lg:text-lg">ポイント</p>
          <p>{details.point}</p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-center gap-3 lg:gap-6 mt-6 lg:mt-8">
          <Button
            onClick={handleBack}
            variant="secondary"
            className="w-full lg:text-lg rounded-full"
          >
            戻る
          </Button>
          <Button
            className="w-full lg:text-lg rounded-full"
            onClick={onSubmit}
            disabled={isSaving || isSaved}
          >
            {buttonLabel}
          </Button>
        </div>
      </CardContent>
    </>
  );
};
