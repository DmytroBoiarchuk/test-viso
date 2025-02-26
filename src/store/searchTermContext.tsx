import {
    Context,
    createContext, JSX,
    ReactNode,
    useCallback,
    useMemo,
    useState,
} from "react";
import { CacheContextInterface } from "../interfaces/interfaces.ts";

export const ctxInitialValue: CacheContextInterface = {
  searchTerm: "",
  addCache: () => {},
};

export const CacheKeyContext: Context<CacheContextInterface> =
  createContext(ctxInitialValue);

const CacheKeyContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [cache, setCache] = useState<string>(ctxInitialValue.searchTerm);

  const addCache = useCallback(
    function addCache(term: string) {
      setCache(term);
    },
    [setCache],
  );

  const cacheValue: CacheContextInterface = useMemo(
    () => ({
      searchTerm: cache,
      addCache,
    }),
    [cache, addCache],
  );

  return (
    <CacheKeyContext.Provider value={cacheValue}>
      {children}
    </CacheKeyContext.Provider>
  );
};

export default CacheKeyContextProvider;
