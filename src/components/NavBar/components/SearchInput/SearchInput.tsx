import classes from "./SearchInput.module.scss";
import {ChangeEvent, useCallback, useContext, useEffect, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { searchRequest } from "../../../../functions/requests.ts";
import { debounce } from "../../../../functions/functions.ts";
import { ImSpinner9 } from "react-icons/im";
import {CacheKeyContext} from "../../../../store/searchTermContext.tsx";
import {useLocation, useNavigate} from "react-router";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const cacheCtx = useContext(CacheKeyContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchRequest(searchTerm),
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000, // remove cache after 10 min
    enabled: searchTerm !== '',
    retry: false,
  });
  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    if(location.search !== '/') {
      navigate('/')
    }
  };
  const debouncedOnChange = useCallback(debounce(onChangeInputHandler, 500), []);
  const debouncedContext =  useCallback(debounce(cacheCtx.addCache, 500),[])

  useEffect(() => {
    if(searchTerm !== '')
    debouncedContext(searchTerm)
  },[searchTerm])
  return (
    <div className={classes.search}>
      <input onChange={debouncedOnChange} type="text" />
      {isLoading && <span><ImSpinner9/></span>}
    </div>
  );
};

export default SearchInput;
