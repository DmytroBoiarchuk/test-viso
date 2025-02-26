import React, { createContext, useState } from "react";
import {
  SavedMealInterface,
  SavedMealsInterface,
} from "../interfaces/interfaces.ts";
export const SavedMealsContext = createContext<SavedMealsInterface>({
  storedArray: [],
  setMeal: () => {},
  removeMeal: () => {},
});

export const SavedMealsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [storedArray, setStoredArray] = useState<SavedMealInterface[]>(() =>
    JSON.parse(localStorage.getItem("savedMeals") || "[]"),
  );

  const setMeal = (
    fsq_id: string,
    name: string,
    ingredients: (string | null)[],
    istructions: string,
  ) => {
    const newData = [
      ...storedArray,
      { fsq_id, name, ingredients, istructions },
    ];
    localStorage.setItem("savedMeals", JSON.stringify(newData));
    setStoredArray(newData);
  };

  const removeMeal = (fsq_id: string) => {
    const newData = storedArray.filter(
      (storedMeals) => storedMeals.fsq_id !== fsq_id,
    );
    localStorage.setItem("savedMeals", JSON.stringify(newData));
    setStoredArray(newData);
  };

  return (
    <SavedMealsContext.Provider value={{ storedArray, setMeal, removeMeal }}>
      {children}
    </SavedMealsContext.Provider>
  );
};

export default SavedMealsContextProvider;
