import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTable, useSortBy, usePagination } from "react-table";
import { NavLink } from "react-router-dom";
import Currency from "./../../components/Currency/Currency";
import { MdSearchOff } from "react-icons/md";
import Loading from "../../components/Loading/Loading";
import { fetchAdminProduct } from "../../redux/features/products";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Myorder = () => {
  let dispatch = useDispatch();
  const [loadCir, setLoadCir] = useState(true);

  const { adminProduct, adminProductLoading } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchAdminProduct());
  }, [dispatch]);
  const data = useMemo(() => {
    if (!adminProduct) {
      return [];
    } else {
      return adminProduct?.map((val) => {
        return {
          productId: val?._id,
          name: val?.name,
          stock: val?.stock,
          price: <Currency price={val?.price} />,
          action: (
            <div className="rdDiv">
              <NavLink
                className={"rdnav"}
                to={`/dashboard/dashupdateproduct/${val?._id}`}
              >
                <MdModeEditOutline />
              </NavLink>
              <MdDelete
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => deleteProduct(val?._id)}
              />
            </div>
          ),
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminProduct]);

  let deleteProduct = async (id) => {
    if (id) {
      setLoadCir(false);
      try {
        let res = await fetch(
          `http://localhost:4000/api/products/admin/deleteproduct/${id}`,
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
          dispatch(fetchAdminProduct());
          toast("Product Deleted Sucessfully");
          setLoadCir(true);
        } else if (data.message === "" || data.message === "") {
          toast(data.message);
          setLoadCir(true);
        }
      } catch (error) {
        return error;
      }
    }
  };

  const columns = useMemo(() => {
    return [
      { Header: "Product ID", accessor: "productId" },
      { Header: "Product Name", accessor: "name" },
      { Header: "Stock", accessor: "stock" },
      { Header: "Amount", accessor: "price" },
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
      {!adminProductLoading ? (
        <Wrapper>
          <>
            {adminProduct?.length !== 0 ? (
              <>
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
              </>
            ) : (
              <div className="emptyMO">
                <MdSearchOff className="emptyMOicon" />
                <p className="emptyMO1">
                  No Product <span>Found!</span>
                </p>
                <p className="emptyMO2">
                  Looks like you haven't made your product yet.
                </p>
                <NavLink to={"/dashboard/dashcreateproduct"}>
                  <button className="emptyMObuts">CREATE PRODUCT</button>
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
            top: "45%",
            left: "50%",
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
  padding-bottom: 3rem;

  .spadp {
    position: absolute;
    bottom: 7rem;
  }

  .rdDiv {
    .rdnav {
      color: green;
      margin-right: 2rem;
    }
  }
  width: 100%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
`;
