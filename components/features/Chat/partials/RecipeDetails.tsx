"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecipeDetails as RecipeDetailsType } from "@/types/cooking";

type Props = {
  details: RecipeDetailsType;
  servings: string;
};

export const RecipeDetails: React.FC<Props> = (data) => {
  const { details, servings } = data;

  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg lg:text-2xl text-center">
          {details.recipeName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
        <div className="flex justify-center mt-6 lg:mt-8">
          <Button
            type="submit"
            className="w-full lg:w-1/2 lg:text-lg rounded-full"
          >
            レシピを保存する
          </Button>
        </div>
      </CardContent>
    </>
  );
};
