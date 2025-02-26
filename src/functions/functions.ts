import {MealInterface} from "../interfaces/interfaces.ts";

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export function findMeal (mealId: string | undefined, mealsArr: MealInterface[] | null) {
    return mealsArr?.find(meal => meal.idMeal === mealId);

}

export function deriveIngredients(meal: MealInterface | undefined): (string | null )[] {
    const igredients =  Object.keys(meal!)
        .filter((key) => key.startsWith("strIngredient"))
        .map((key) => meal![key as keyof MealInterface])
        .filter((value) => value !== "" && value !== null);
    const mesures = Object.keys(meal!).filter((key) => key.startsWith("strMeasure")).map((key) => meal![key as keyof MealInterface])
        .filter((value) => value !== "" && value !== null);
    return igredients.map((ing, index) => `${mesures[index]} ${ing}`)
}
