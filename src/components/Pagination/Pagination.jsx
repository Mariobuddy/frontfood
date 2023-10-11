import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

const PaginationMain = ({ perPageCount, totalItemCount, sendPage }) => {
  const [activePage, setActivePage] = useState(1);
  const handlePageChange = (e) => {
    setActivePage(e);
    sendPage(e);
    window.scrollTo(0, 0);
  };
  return (
    <>
      {perPageCount < totalItemCount ? (
        <Wrapper>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={perPageCount}
            totalItemsCount={totalItemCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            nextPageText={">>"}
            prevPageText={"<<"}
            lastPageText={"Last"}
            firstPageText={"1st"}
            itemClass="page-item"
            linkClass="page-class"
            activeLinkClass="page-link-active"
            activeClass="page-class-active"
          />
        </Wrapper>
      ) : (
        ""
      )}
    </>
  );
};

export default PaginationMain;

const Wrapper = styled.div`
  .page-link-active {
    color: #ffffff !important;
  }

  .page-class-active {
    background-color: orangered;
  }
  padding: 2rem 0rem;
  .pagination {
    display: flex;
    .page-item {
      list-style-type: none;
      padding: 0.5rem 1rem;
      margin: 0rem 1rem;
      width: fit-content;
      height: fit-content;
      font-size: 1.6rem;
      .page-class {
        color: orangered;
      }
    }
  }
`;
