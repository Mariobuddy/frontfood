import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../../redux/features/order";
import { useTable, useSortBy, usePagination } from "react-table";
import { FaShareFromSquare } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Currency from "./../../components/Currency/Currency";
import { MdSearchOff } from "react-icons/md";
import Loading from "../../components/Loading/Loading";

const Myorder = () => {
  let dispatch = useDispatch();
  const { myOrderData, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);
  const data = useMemo(() => {
    if (!myOrderData) {
      return [];
    } else {
      return myOrderData?.map((val) => {
        return {
          orderId: val?._id,
          itemQty: val?.orderItems?.reduce((acc, cur) => {
            return acc + cur.quantity;
          }, 0),
          amount: <Currency price={val?.totalPrice} />,
          status: (
            <p
              style={{
                color: val?.orderStatus === "Processing" ? "red" : "green",
              }}
            >
              {val?.orderStatus}
            </p>
          ),
          action: (
            <NavLink to={`/protected/singleorderget/${val?._id}`}>
              <button className="mobuts">
                <FaShareFromSquare />
              </button>
            </NavLink>
          ),
        };
      });
    }
  }, [myOrderData]);

  const columns = useMemo(() => {
    return [
      { Header: "Order ID", accessor: "orderId" },
      { Header: "Status", accessor: "status" },
      { Header: "Items Qty", accessor: "itemQty" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Actions", accessor: "action" },
    ];
  }, []);

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
  return (
    <>
      {!loading ? (
        <Wrapper>
          <p className="dop">My Orders</p>
          <>
            {myOrderData?.length !== 0 ? (
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
            ) : (
              <div className="emptyMO">
                <MdSearchOff className="emptyMOicon" />
                <p className="emptyMO1">
                  No order <span>Found!</span>
                </p>
                <p className="emptyMO2">
                  Looks like you haven't made your order yet.
                </p>
                <NavLink to={"/protected/product"}>
                  <button className="emptyMObuts">RETURN TO SHOP</button>
                </NavLink>
              </div>
            )}
          </>
        </Wrapper>
      ) : (
        <div
          className="mos"
          style={{
            position: "absolute",
            top: "35%",
            left: "47%",
            minHeight: "80vh",
          }}
        >
          <Loading />
        </div>
      )}
    </>
  );
};

export default Myorder;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  .dop {
    font-size: 2rem;
    padding: 0.5rem 3rem;
    margin: 1rem 0rem;
    width: 100%;
    text-align: center;
  }

  .topest {
    padding-bottom: 3rem;
    width: 100%;
    min-height: 90%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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
      width: inherit;
      height: 100%;
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
  .emptyMO {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50vh;
    padding-top: 4rem;

    .emptyMOicon {
      font-size: 10rem;
      color: orangered;
    }
    .emptyMO1 {
      font-size: 3rem;
      span {
        color: orangered;
      }
    }
    .emptyMO2 {
      font-size: 1.6rem;
    }
    .emptyMObuts {
      width: 15rem;
      margin-top: 1rem;
      font-size: 1.4rem;
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
  }

  @media (min-width: 350px) and (max-width: 768px) {
    width: 100%;
    height: 100vh;
    .dop {
      font-size: 2rem;
      padding: 0.5rem 3rem;
      margin: 1rem 0rem;
      width: 100%;
      text-align: center;
    }

    .topest {
      padding-bottom: 3rem;
      width: 100%;
      min-height: 50%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
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
        width: inherit;
        height: 100%;
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
    .emptyMO {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 50vh;
      padding-top: 4rem;

      .emptyMOicon {
        font-size: 10rem;
        color: orangered;
      }
      .emptyMO1 {
        font-size: 3rem;
        span {
          color: orangered;
        }
      }
      .emptyMO2 {
        font-size: 1.6rem;
      }
      .emptyMObuts {
        width: 15rem;
        margin-top: 1rem;
        font-size: 1.4rem;
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
    }
  }
`;
