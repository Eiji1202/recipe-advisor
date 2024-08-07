"use client";

import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CookingTime,
  recipeInputSchema,
  RecipeInputSchemaType,
  Servings,
  Taste,
} from "@/utils/schema/recipeInput";
import {
  cookingTimeOptions,
  tasteOptions,
  servingsOptions,
} from "@/utils/constants/options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Asterisk, Loader } from "lucide-react";

const RecipeInput: React.FC = () => {
  const form = useForm<RecipeInputSchemaType>({
    resolver: zodResolver(recipeInputSchema),
    defaultValues: {
      cookingTime: undefined,
      taste: undefined,
      ingredients: [{ ingredient: "" }],
      seasonings: [{ seasoning: "" }],
      servings: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    register,
  } = form;

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: seasoningFields,
    append: appendSeasoning,
    remove: removeSeasoning,
  } = useFieldArray({
    control: form.control,
    name: "seasonings",
  });

  const onSubmit: SubmitHandler<RecipeInputSchemaType> = (data) => {
    const filteredData = {
      ...data,
      seasonings: data?.seasonings?.filter(
        (seasoning) => seasoning?.seasoning?.trim() !== ""
      ),
    };

    console.log(filteredData);
  };

  return (
    <Card className="w-full max-w-[800px] lg:p-6">
      <CardHeader>
        <CardTitle className="text-lg lg:text-2xl text-center">
          レシピを提案してもらう
        </CardTitle>
        <CardDescription className="tlg:text-base flex items-center justify-center">
          <Asterisk size={18} />
          は必須項目です
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 lg:space-y-6">
              <FormField
                control={control}
                name="cookingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-lg flex items-center">
                      調理時間
                      <Asterisk
                        size={18}
                        className="text-destructive"
                      />
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value: CookingTime) =>
                          setValue("cookingTime", value)
                        }
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {cookingTimeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{errors.cookingTime?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="taste"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-lg flex items-center">
                      味のテイスト
                      <Asterisk
                        size={18}
                        className="text-destructive"
                      />
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value: Taste) =>
                          setValue("taste", value)
                        }
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {tasteOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{errors.taste?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="ingredients"
                render={() => (
                  <FormItem>
                    <FormLabel className="lg:text-lg flex items-center">
                      使いたい食材（最大5個）
                      <Asterisk
                        size={18}
                        className="text-destructive"
                      />
                    </FormLabel>
                    {ingredientFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex flex-col mb-2"
                      >
                        <div className="flex items-center">
                          <FormControl>
                            <Input
                              {...register(
                                `ingredients.${index}.ingredient` as const
                              )}
                              placeholder="食材を入力してください"
                              className="w-full mr-2"
                            />
                          </FormControl>
                          {ingredientFields.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeIngredient(index)}
                              variant="destructive"
                            >
                              削除
                            </Button>
                          )}
                        </div>
                        <FormMessage>
                          {errors.ingredients?.[index]?.ingredient?.message}
                        </FormMessage>
                      </div>
                    ))}
                    {ingredientFields.length < 5 && (
                      <Button
                        type="button"
                        onClick={() => appendIngredient({ ingredient: "" })}
                        variant="outline"
                      >
                        追加
                      </Button>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="seasonings"
                render={() => (
                  <FormItem>
                    <FormLabel className="lg:text-lg">
                      使いたい調味料（最大5個）
                    </FormLabel>
                    {seasoningFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center mb-2"
                      >
                        <FormControl>
                          <Input
                            {...register(
                              `seasonings.${index}.seasoning` as const
                            )}
                            placeholder="調味料を入力してください"
                            className="w-full mr-2"
                          />
                        </FormControl>
                        {seasoningFields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeSeasoning(index)}
                            variant="destructive"
                          >
                            削除
                          </Button>
                        )}
                      </div>
                    ))}
                    {seasoningFields.length < 5 && (
                      <Button
                        type="button"
                        onClick={() => appendSeasoning({ seasoning: "" })}
                        variant="outline"
                      >
                        追加
                      </Button>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="lg:text-lg flex items-center">
                      人数
                      <Asterisk
                        size={18}
                        className="text-destructive"
                      />
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value: Servings) =>
                          setValue("servings", value)
                        }
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {servingsOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{errors.servings?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center mt-6 lg:mt-8">
              <Button
                type="submit"
                className="w-full lg:w-1/2 lg:text-lg rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>料理を提案してもらう</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RecipeInput;
