import React, { useState, useMemo } from "react";
import { styled } from "styled-components";
import { MdOutlineReviews } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import base_url from "../Base_Url/Base_Url";
import {
  fetchReview,
  getProductId,
  setReview,
} from "../../redux/features/products";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTable, useSortBy, usePagination } from "react-table";
import Loading from "../../components/Loading/Loading";

const DashReviews = () => {
  let dispatch = useDispatch();
  const [loadCir, setLoadCir] = useState(true);

  const { userReview, userReviewLoading, productId } = useSelector(
    (state) => state.products
  );

  const data = useMemo(() => {
    if (!userReview) {
      return [];
    } else {
      return userReview?.map((val) => {
        return {
          reviewId: val?._id,
          user: val?.name,
          comment: val?.comment,
          rating: (
            <p style={{ color: val?.rating < 3 ? "red" : "green" }}>
              {val?.rating}
            </p>
          ),
          action: (
            <MdDelete
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => deleteProduct(val?._id)}
              className="mainDel"
            />
          ),
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReview]);
  const columns = useMemo(() => {
    return [
      { Header: "Review ID", accessor: "reviewId" },
      { Header: "User", accessor: "user" },
      { Header: "Comment", accessor: "comment" },
      { Header: "Rating", accessor: "rating" },
      { Header: "Actions", accessor: "action" },
    ];
  }, []);
  let deleteProduct = async (reviewID) => {
    if (productId && reviewID) {
      setLoadCir(false);
      try {
        let res = await fetch(
          `${base_url}/api/products/admin/deletereview?productId=${productId}&Id=${reviewID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        let data = await res.json();
        if (res.status === 200) {
          toast("Review Deleted Sucessfully");
          setLoadCir(true);
          dispatch(setReview(data.review));
        } else if (
          data.message === "Internal Server Error" ||
          data.message === "Product not found"
        ) {
          toast(data.message);
          setLoadCir(true);
        }
      } catch (error) {
        return error;
      }
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Initial page index and size
    },
    useSortBy,
    usePagination
  );
  let changeId = (e) => {
    dispatch(getProductId(e.target.value));
  };
  let handSubmit = async (e) => {
    e.preventDefault();
    if (productId.length === 24) {
      dispatch(fetchReview(productId));
    }
  };
  return (
    <Wrapper>
      <div className="rwtop">
        <p>ALL REVIEWS</p>
        <div className="cpDiv">
          <MdOutlineReviews className="cpicon" />
          <input
            value={productId}
            onChange={changeId}
            placeholder="Product ID"
            name="name"
          />
        </div>
        <button className="cpcbuts" onClick={handSubmit}>
          SEARCH
        </button>
      </div>
      <div className="rwbottom">
        {userReview.length !== 0 ? (
          <>
            {!userReviewLoading && (
              <div className="topest">
                <table {...getTableProps()} className="table">
                  <thead
                    className="tableHead"
                    style={{ border: "2px solid red" }}
                  >
                    {headerGroups.map((headerGroup) => (
                      <tr
                        {...headerGroup.getHeaderGroupProps()}
                        className="tableRow"
                      >
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <span
                  style={{ display: loadCir ? "none" : "block" }}
                  className="spadp"
                >
                  <Loading />
                </span>
                <div className="tpage">
                  <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                    </strong>{" "}
                  </span>
                  <button
                    className="tpbuts"
                    onClick={() => gotoPage(0)}
                    disabled={pageIndex === 0}
                  >
                    {"<<"}
                  </button>{" "}
                  <button
                    className="tpbuts"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    {"<"}
                  </button>{" "}
                  <button
                    className="tpbuts"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    {">"}
                  </button>{" "}
                  <button
                    className="tpbuts"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={pageIndex === pageCount - 1}
                  >
                    {">>"}
                  </button>{" "}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="nfr">No Review Found</p>
        )}
      </div>
    </Wrapper>
  );
};

export default DashReviews;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2rem;
  align-items: center;

  .rwbottom {
    margin-top: 2rem;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;

    .topest {
      width: 100%;
      min-height: 90%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .rdDiv {
        .rdnav {
          color: green;
          margin-right: 2rem;
        }
      }

      .mobuts {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1.8rem;
        &:hover {
          color: orangered;
        }
      }

      .table {
        width: 100%;
        height: fit-content;
        font-size: 1.6rem;

        thead {
          background-color: orangered;
          color: #ffffff;
        }

        th {
          padding: 1rem 0rem;
        }
        td {
          text-align: center;
          padding: 1rem 0rem;
        }
      }

      .tpage {
        width: inherit;
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 2rem;

        .tpbuts {
          background-color: orangered;
          font-size: 1.6rem;
          color: #ffffff;
          outline: none;
          border: none;
          padding: 0.5rem 1rem;
          margin: 0rem 1rem;
          cursor: pointer;
          border: 2px solid orangered;
          &:hover {
            background-color: #ffffff;
            color: orangered;
            border: 2px solid orangered;
          }
        }
        span {
          font-size: 1.6rem;
          color: orangered;
          strong {
          }
        }
      }
    }

    .nfr {
      font-size: 3rem;
    }
  }
  .rwtop {
    width: fit-content;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .cpcbuts {
      width: 20vw;
      font-size: 1.6rem;
      height: 4rem;
      color: #ffffff;
      border: none;
      cursor: pointer;
      background-color: orangered;
      border-radius: 0.4rem;
      outline: none;
      &:hover {
        color: orangered;
        background-color: transparent;
        border: 2px solid orangered;
      }
    }

    > p {
      font-size: 2rem;
    }
    .cpDiv {
      border: 2px solid var(--dim);
      padding: 1rem 0rem;
      width: 20vw;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .cpicon {
        font-size: 2rem;
        margin: 0rem 1.5rem;
        color: orangered;
      }

      select {
        background-color: transparent;
        width: 20vw;
        outline: none;
        color: var(--dim);
        cursor: pointer;
        border: none;
        &:focus {
          color: black;
        }
        outline: none;
        font-size: 1.6rem;
        option {
          font-size: 1.6rem;
          cursor: pointer;
        }
      }
      input {
        border: none;
        outline: none;
        font-size: 1.6rem;
        width: 100%;
      }
    }
  }
  @media (min-width: 350px) and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 2rem;
    align-items: center;

    .mainDel{
      margin-right: 2rem;
      font-size: 1.5rem;
    }

    .rwbottom {
      margin-top: 2rem;
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;

      .topest {
        width: 100%;
        min-height: 50%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .rdDiv {
          .rdnav {
            color: green;
            margin-right: 2rem;
          }
        }

        .mobuts {
          background-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 1.8rem;
          &:hover {
            color: orangered;
          }
        }

        .table {
          width: 100%;
          height: fit-content;
          font-size: 1.2rem;

          thead {
            background-color: orangered;
            color: #ffffff;
          }

          th {
            padding: 1rem 0rem;
          }
          td {
            text-align: center;
            padding: 1rem 0rem;
          }
        }

        .tpage {
          width: inherit;
          text-align: center;
          margin-top: 2rem;
          margin-bottom: 2rem;

          .tpbuts {
            background-color: orangered;
            font-size: 1.6rem;
            color: #ffffff;
            outline: none;
            border: none;
            padding: 0.5rem 1rem;
            margin: 0rem 1rem;
            cursor: pointer;
            border: 2px solid orangered;
            &:hover {
              background-color: #ffffff;
              color: orangered;
              border: 2px solid orangered;
            }
          }
          span {
            font-size: 1.6rem;
            color: orangered;
            strong {
            }
          }
        }
      }

      .nfr {
        font-size: 3rem;
      }
    }
    .rwtop {
      width: fit-content;
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .cpcbuts {
        width: 100%;
        font-size: 1.6rem;
        height: 4rem;
        color: #ffffff;
        border: none;
        cursor: pointer;
        background-color: orangered;
        border-radius: 0.4rem;
        outline: none;
        &:hover {
          color: orangered;
          background-color: transparent;
          border: 2px solid orangered;
        }
      }

      > p {
        font-size: 2rem;
      }
      .cpDiv {
        border: 2px solid var(--dim);
        padding: 1rem 0rem;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .cpicon {
          font-size: 2rem;
          margin: 0rem 1.5rem;
          color: orangered;
        }

        select {
          background-color: transparent;
          width: 80%;
          outline: none;
          color: var(--dim);
          cursor: pointer;
          border: none;
          &:focus {
            color: black;
          }
          outline: none;
          font-size: 1.6rem;
          option {
            font-size: 1.6rem;
            cursor: pointer;
          }
        }
        input {
          border: none;
          outline: none;
          font-size: 1.6rem;
          width: 100%;
        }
      }
    }
  }
`;
