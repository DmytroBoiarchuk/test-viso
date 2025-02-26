import MealsList from "./components/MealsList/MealsList.tsx";
import classes from "./SearchPage.module.scss";

const SearchPage = () => {
  return (
    <main className={classes.searchPageBody}>
      <MealsList />
    </main>
  );
};

export default SearchPage;
