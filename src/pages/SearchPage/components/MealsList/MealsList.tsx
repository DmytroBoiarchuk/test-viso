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
import { categories } from "../../../../store/categories.ts";

const MealsList = () => {
  const [category, setCategory] = useState<string>("No Filter");
  const [pagination, setPagination] = useState<PaginationStateInterface>({
    currentPage: 0,
    numberOfPages: 0,
  });

  const queryClient = useQueryClient();
  const cacheKeyCtx = useContext(CacheKeyContext);
  const cachedData: RecipesResponseInterface | undefined =
    queryClient.getQueryData(["search", cacheKeyCtx.searchTerm]);

  const filteredData = cachedData?.meals?.filter(
    (meal) => meal.strCategory === category || category === "No Filter",
  );
  useEffect(() => {
    if (filteredData)
      setPagination({
        currentPage: 0,
        numberOfPages: Math.ceil(filteredData.length / 10),
      });
  }, [cachedData, category]);
  return (
    <section className={classes.mealsList}>
      <div className={classes.filter}>
        <label>Filter by category</label>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredData
          ?.filter(
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
