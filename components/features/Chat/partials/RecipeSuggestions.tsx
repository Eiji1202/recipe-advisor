"usee client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectRecipeType } from "../Chat";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  recipes: string[];
  onSubmit: () => void;
};

const RecipeSuggestions: React.FC<Props> = (props) => {
  const { recipes, onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SelectRecipeType>();

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-lg lg:text-2xl">料理を決定する</CardTitle>
        <CardDescription>以下から作る料理を選択してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:max-w-[500px] mx-auto"
        >
          <FormField
            control={control}
            name="selectRecipe"
            rules={{ required: "料理を選択してください" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className={`flex flex-col gap-4 border border-gray-300 rounded-lg p-4 ${
                      errors.selectRecipe?.message && "border-destructive"
                    }`}
                  >
                    {recipes.map((recipe, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <RadioGroupItem
                          value={recipe}
                          id={`recipe-${index}`}
                        />
                        <Label
                          htmlFor={`recipe-${index}`}
                          className="font-semibold lg:text-lg hover:cursor-pointer"
                        >
                          {recipe}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage>{errors.selectRecipe?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-center mt-6 lg:mt-8">
            <Button
              type="submit"
              className="w-full lg:w-1/2 lg:text-lg rounded-full"
            >
              決定する
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  );
};

export default RecipeSuggestions;
