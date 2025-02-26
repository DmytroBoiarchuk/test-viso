import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage/SearchPage.tsx";
import RecipePage from "./pages/RecipePage/RecipePage.tsx";
import SavedRecipesPage from "./pages/SavedRecipesPage/SavedRecipesPage.tsx";
import RootLayout from "./components/RootLayout/RootLayout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CacheKeyContextProvider from "./store/searchTermContext.tsx";
import SavedMealsContextProvider from "./store/savedContext.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <SearchPage />,
      },
      {
        path: "/:recipeId",
        element: <RecipePage />,
      },
      {
        path: "/saved",
        element: <SavedRecipesPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SavedMealsContextProvider>
        <CacheKeyContextProvider>
          <RouterProvider router={router} />
        </CacheKeyContextProvider>
      </SavedMealsContextProvider>
    </QueryClientProvider>
  );
}

export default App;
