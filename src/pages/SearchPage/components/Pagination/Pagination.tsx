import { PaginationStateInterface } from "../../../../interfaces/interfaces.ts";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import classes from "./Pagination.module.scss";

interface PaginationProps {
  pagination: PaginationStateInterface;
  setPagination: Dispatch<SetStateAction<PaginationStateInterface>>;
}
const Pagination = ({
  pagination,
  setPagination,
}: PaginationProps): JSX.Element => {
  const [pageInterval, setPageInterval] = useState<number>(0);
  const pages = Array.from(
    { length: pagination.numberOfPages <= 10 ? pagination.numberOfPages : 7 },
    (_, index) => index + 1 + pageInterval * 7,
  );
  function handlePageChange(event: React.MouseEvent<HTMLButtonElement>) {
    const newPage = +event.currentTarget.value;
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage - 1,
    }));
  }
  function nextPageClickButtonHandler() {
    if (pagination.currentPage !== pagination.numberOfPages)
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    if (pagination.currentPage > pages[pages.length - 3]) {
      setPageInterval((prevState) => prevState + 1);
    }
  }
  function prevPageClickButtonHandler() {
    if (pagination.currentPage !== 0) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
      if (pagination.currentPage < pages[0]) {
        setPageInterval((prevState) => prevState - 1);
      }
    }
  }
  function goToNextPagesInterval() {
    setPageInterval((prevState) => prevState + 1);
  }
  function goToPrevPagesInterval() {
    setPageInterval((prevState) => prevState - 1);
  }
  return (
    <div className={classes.pagination}>
      <button onClick={prevPageClickButtonHandler}>{"<"}</button>
      {pageInterval !== 0 && (
        <button onClick={goToPrevPagesInterval}>...</button>
      )}
      {pages.map((page) => (
        <button
          className={`${page === pagination.currentPage + 1 ? classes.active : ""} ${page > pagination.numberOfPages ? classes.displayNon : ""}`}
          onClick={handlePageChange}
          value={page}
          key={page}
        >
          {page}
        </button>
      ))}
      {pagination.numberOfPages > 10 &&
        pageInterval !== Math.floor(pagination.numberOfPages / 7) && (
          <>
            <button onClick={goToNextPagesInterval}>...</button>
            <button
              onClick={handlePageChange}
              className={
                pagination.numberOfPages - 1 === pagination.currentPage
                  ? classes.active
                  : ""
              }
              value={pagination.numberOfPages}
            >
              {pagination.numberOfPages}
            </button>
          </>
        )}
      <button disabled={pagination.numberOfPages === pagination.currentPage+1} onClick={nextPageClickButtonHandler}>{">"}</button>
    </div>
  );
};

export default Pagination;
