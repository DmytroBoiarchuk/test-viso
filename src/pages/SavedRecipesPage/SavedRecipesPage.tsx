import { useContext } from "react";
import { SavedMealsContext } from "../../store/savedContext.tsx";
import {SavedMealInterface} from "../../interfaces/interfaces.ts";
import classes from './SavedRecipesPage.module.scss'
import {Link} from "react-router";

const SavedRecipesPage = () => {
  const storedArray: SavedMealInterface[] = useContext(SavedMealsContext).storedArray;
  const allIngredients = storedArray.map(recipe => recipe.ingredients).flat();
  const uniqueIngredients = [...new Set(allIngredients)].join(", ")
    console.log(uniqueIngredients);
  return <div className={classes.savedRecipesPage}>
      <article>
          <h1>Your Recipes</h1>
          <ul>
              {storedArray.map(recipe => <li key={recipe.fsq_id}><Link to={`/${recipe.fsq_id}`}>{recipe.name}</Link></li> )}</ul>
      </article>
      <article>
          <h1>Your Ingredients</h1>
          {uniqueIngredients}
      </article>

  </div>;
};

export default SavedRecipesPage;
