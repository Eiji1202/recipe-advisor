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
import { toast } from "@/components/ui/use-toast";
import { getRecipeDetailsById } from "@/lib/api/recipe/getRecipeDetailsById";
import { SaveRecipeType as RecipeDetailsType } from "@/types/cooking";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RecipeDetailsView: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const [recipe, setRecipe] = useState<RecipeDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchRecipe = async () => {
      if (id) {
        try {
          const recipeDetails = await getRecipeDetailsById(id);
          setRecipe(recipeDetails);
        } catch (error: any) {
          toast({
            title: "レシピ詳細の取得に失敗しました",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <Card className="w-full max-w-[800px] min-h-[320px] lg:p-6">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center gap-2 text-muted-foreground">
          <Loader
            className="animate-spin"
            size={20}
          />
          <p>レシピを取得中...</p>
        </div>
      ) : (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-lg lg:text-2xl">
              {recipe?.recipeName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>材料</TableHead>
                  <TableHead>分量（{recipe?.servings}）</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipe?.ingredients.map((ingredient, index) => (
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
                {recipe?.process.map((step, index) => (
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
              <p>{recipe?.point}</p>
            </div>
            <div className="flex items-center justify-center mt-6 lg:mt-8">
              <Button
                // onClick={handleBack}
                variant="secondary"
                className="w-full lg:text-lg rounded-full"
              >
                戻る
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default RecipeDetailsView;
