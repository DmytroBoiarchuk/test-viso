import { MealInterface } from "../../../../interfaces/interfaces.ts";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import classes from "./MealCard.module.scss";
import {useContext, useState} from "react";
import {Link} from "react-router";
import {deriveIngredients} from "../../../../functions/functions.ts";
import {SavedMealsContext} from "../../../../store/savedContext.tsx";

interface MealCardProps {
  meal: MealInterface;
}
const MealCard = ({ meal }: MealCardProps) => {
  const savedListCtx = useContext(SavedMealsContext);

  const ingredientValues = deriveIngredients(meal);
  const wasSaved: boolean = savedListCtx.storedArray.some(
      (savedMeal) => savedMeal.fsq_id === meal.idMeal,
  );

  const [isSaved, setIsSaved] = useState<boolean>(wasSaved);
  function onSaveHandler(save: boolean): void {
    const ingredients = deriveIngredients(meal);
    if (save) savedListCtx.setMeal(meal.idMeal, meal.strMeal, ingredients, meal.strInstructions);
    else savedListCtx.removeMeal(meal.idMeal);
    setIsSaved(save);
  }
  return (
    <div className={classes.mealCard}>
      <img src={meal.strMealThumb || undefined} alt="meal image" />
      <div className={classes.aboutContainer}>
        <h1>{meal.strMeal}</h1>
          <h3>Ingredients:</h3>
        <ul className={classes.listOfIngredients}>
          {ingredientValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
      {!isSaved ? (
        <button className={classes.savedSign} onClick={() => onSaveHandler(true)}>
          <FaRegHeart />
        </button>
      ) : (
        <button className={classes.savedSign} onClick={() => onSaveHandler(false)}>
          <FaHeart />
        </button>
      )}
        <Link className={classes.fullRecipePage} to={`/${meal.idMeal}`}>Full Recipe</Link>
    </div>
  );
};

export default MealCard;
