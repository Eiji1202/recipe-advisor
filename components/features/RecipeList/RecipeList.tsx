"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/config/firebase";
import { deleteRecipe } from "@/lib/api/recipe/deleteRecipe";
import { getAllRecipe } from "@/lib/api/recipe/getAllRecipe";
import { RecipeListType, Taste } from "@/types/cooking";
import { User } from "firebase/auth";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RecipeList: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<RecipeListType | []>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      toast({
        title: "ユーザー情報の取得に失敗しました",
        variant: "destructive",
      });
      router.back();
    }

    const fetchRecipes = async () => {
      if (user?.uid) {
        try {
          const recipes = await getAllRecipe(user.uid);
          setRecipes(recipes);
        } catch (error: any) {
          toast({
            title: "レシピ一覧の取得に失敗しました",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    };

    fetchRecipes();
  }, [user, router, isDeleted]);

  // テイスト別にレシピを分類する関数
  const categorizeRecipesByTaste = (recipes: RecipeListType) => {
    const initialAcc = Object.fromEntries(
      (["和風", "洋風", "中華風", "韓国風", "エスニック風"] as Taste[]).map(
        (taste) => [taste, []]
      )
    ) as unknown as Record<Taste, RecipeListType>;

    return recipes.reduce((acc, recipe) => {
      acc[recipe.taste].push(recipe);
      return acc;
    }, initialAcc);
  };

  const categorizedRecipes = categorizeRecipesByTaste(recipes);

  // レシピの削除
  const handleDeleteRecipe = async (id: string) => {
    const isConfirmed = confirm("本当に削除しますか？");
    if (!isConfirmed) return;

    try {
      // レシピの削除処理を実装
      await deleteRecipe(id);
      toast({
        title: "レシピを削除しました",
      });
      setIsDeleted(true);
    } catch (error: any) {
      toast({
        title: "レシピの削除に失敗しました",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full lg:p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-lg lg:text-2xl">レシピ一覧</CardTitle>
        <CardDescription>保存したレシピの一覧です</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="和風">
          <TabsList className="grid w-full md:grid-cols-5 overflow-auto">
            {Object.keys(categorizedRecipes).map((taste) => (
              <TabsTrigger
                key={taste}
                value={taste}
              >
                {taste}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.keys(categorizedRecipes).map((taste) => (
            <TabsContent
              key={taste}
              value={taste}
            >
              <Table>
                <TableBody>
                  {categorizedRecipes[taste as Taste].length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="text-center text-muted-foreground"
                      >
                        保存した{taste}のレシピはありません
                      </TableCell>
                    </TableRow>
                  ) : (
                    categorizedRecipes[taste as Taste].map((recipe) => (
                      <TableRow key={recipe.id}>
                        <TableCell className="font-medium flex items-center justify-between">
                          <Link
                            href={`/recipe/list/${recipe.id}`}
                            className="underline underline-offset-4 hover:opacity-70 transition-opacity"
                          >
                            {recipe.recipeName}（{recipe.servings}）
                          </Link>
                          <Button
                            asChild
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            size="icon"
                            variant="outline"
                            className="hover:cursor-pointer p-1"
                          >
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RecipeList;
