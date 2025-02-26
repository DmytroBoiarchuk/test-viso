import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CacheKeyContext } from "../../../../store/searchTermContext.tsx";
import {
  MealInterface,
  PaginationStateInterface,
  RecipesResponseInterface,
} from "../../../../interfaces/interfaces.ts";
import MealCard from "../MealCard/MealCard.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import classes from "./MealsList.module.scss";

const MealsList = () => {
  const [category, setCategory] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationStateInterface>({
    currentPage: 0,
    numberOfPages: 0,
  });
  const queryClient = useQueryClient();
  const cacheKeyCtx = useContext(CacheKeyContext);
  const cachedData: RecipesResponseInterface | undefined =
    queryClient.getQueryData(["search", cacheKeyCtx.searchTerm]);
  useEffect(() => {
    if (cachedData && cachedData.meals)
      setPagination((prevState) => ({
        ...prevState,
        numberOfPages: Math.ceil(cachedData!.meals!.length / 10),
      }));
  }, [cachedData]);
  return (
    <section className={classes.mealsList}>
      <ul>
        {cachedData?.meals
            ?.filter(meal => meal.strCategory===category)
            .filter(
            (_, index) =>
              index >= pagination.currentPage * 10 &&
              index < pagination.currentPage * 10 + 10,
          )
          .map((meal: MealInterface) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
      </ul>
      {cachedData?.meals === null && <p>No recipes found ...</p>}
      {pagination.numberOfPages > 1 && (
        <Pagination pagination={pagination} setPagination={setPagination} />
      )}
    </section>
  );
};

export default MealsList;
