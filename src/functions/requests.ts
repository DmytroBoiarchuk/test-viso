import {RecipesResponseInterface} from "../interfaces/interfaces.ts";

export async function searchRequest(query: string | undefined): Promise<RecipesResponseInterface | undefined> {
  const apiUrl: string = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  if (!query) return;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Error with status: ${response.status.toString()}. Reason: ${errorData.message}`,
    );
  }
 return  await response.json()
}

export async function searchSingleMealRequest(id: string| undefined): Promise<RecipesResponseInterface | undefined> {
  const apiUrl: string = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
        `Error with status: ${response.status.toString()}. Reason: ${errorData.message}`,
    );
  }
  return  await response.json()
}
