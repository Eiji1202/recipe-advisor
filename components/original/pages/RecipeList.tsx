"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Input } from "@/components/shadcn-ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/shadcn-ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs";
import { toast } from "@/components/shadcn-ui/use-toast";
import { auth } from "@/config/firebase";
import { deleteRecipe } from "@/lib/api/recipe/deleteRecipe";
import { getAllRecipe } from "@/lib/api/recipe/getAllRecipe";
import { RecipeListType, Taste } from "@/types/cooking";
import { User } from "firebase/auth";
import { CircleX, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RecipeList: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [allRecipes, setAllRecipes] = useState<RecipeListType>([]); // 初期の全レシピデータ
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeListType>([]); // フィルタリングされたレシピ
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

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
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const fetchRecipes = async () => {
      try {
        const recipes = await getAllRecipe(user.uid);
        setAllRecipes(recipes);
        setFilteredRecipes(recipes);
      } catch (error: any) {
        toast({
          title: "レシピ一覧の取得に失敗しました",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchRecipes();
  }, [user, router, isDeleted]);

  /**
   * フィルタリング処理
   * 料理名か食材名に検索後が含まれているレシピを抽出
   */
  const handleSearch = () => {
    const newFilteredRecipes = allRecipes.filter(
      (recipe) =>
        recipe.recipeName.includes(searchInput) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.name.includes(searchInput)
          )
    );
    setFilteredRecipes(newFilteredRecipes);
  };

  // 検索ワードのリセット関数
  const resetSearch = () => {
    setSearchInput("");
    setFilteredRecipes(allRecipes);
  };

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

  const categorizedRecipes = categorizeRecipesByTaste(filteredRecipes);

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
      <CardContent className="space-y-4">
        <div className="flex gap-2 items-center relative">
          <Input
            placeholder="料理名・食材から検索"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput.length > 0 && (
            <button
              className="absolute right-12 hover:opacity-60 transition-opacity"
              onClick={resetSearch}
            >
              <CircleX className="bg-white"/>
            </button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={handleSearch}
            disabled={searchInput.length === 0}
          >
            <Search />
          </Button>
        </div>
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
