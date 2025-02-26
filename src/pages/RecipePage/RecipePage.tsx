import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CacheKeyContext } from "../../store/searchTermContext.tsx";
import {
  MealInterface,
  RecipesResponseInterface,
} from "../../interfaces/interfaces.ts";
import { searchSingleMealRequest } from "../../functions/requests.ts";
import { deriveIngredients, findMeal } from "../../functions/functions.ts";
import recipeCardClasses from "../SearchPage/components/MealCard/MealCard.module.scss";
import classes from "./RecipePage.module.scss";

const RecipePage = () => {
  const [meal, setMeal] = useState<MealInterface | undefined>();
  const [ingredients, setIngredients] = useState<(string | null)[]>([]);
  const params = useParams();
  const queryClient = useQueryClient();
  const cacheKeyCtx = useContext(CacheKeyContext);

  const { refetch } = useQuery({
    queryKey: ["search", params.recipeId],
    queryFn: () => searchSingleMealRequest(params.recipeId),
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000, // remove cache after 10 min
    enabled: false,
    retry: false,
  });
  const cachedData: RecipesResponseInterface | undefined =
    queryClient.getQueryData(["search", cacheKeyCtx.searchTerm]);
  useEffect(() => {
    async function refetchRecipe() {
      const result = await refetch();
      return  result.data;
    }

    if (!cachedData) {
      console.log('refetch')
      refetchRecipe().then((meal) => setMeal(meal?.meals?.[0]));
    } else {
      const meal = findMeal(params.recipeId, cachedData.meals);
      setMeal(meal);
    }
  }, [cachedData]);
  useEffect(() => {
    if (meal) setIngredients(deriveIngredients(meal));
  }, [meal]);


  return (
    <div className={classes.recipePage}>
      <article className={classes.aboutContainer}>
        <img src={meal?.strMealThumb || undefined} alt="meal image" />
        <div className={classes.aboutMeal}>
          <h1>{meal?.strMeal}</h1>
          <h3>Ingredients:</h3>
          <ul className={recipeCardClasses.listOfIngredients}>
            {ingredients.map((value, index) => (
              <li key={index}><p className={classes.ingredient}>{value}</p></li>
            ))}
          </ul>
        </div>
      </article>
      <div className={classes.instruction}>
        <h4>Instructions:</h4>
        <p>{meal?.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipePage;
