import React, { useEffect } from "react";
import styled from "styled-components";
import { Currency } from "../../components";
import GraphCart from "../../components/GraphCart/GraphCart";
import CircleChart from "../../components/CircleChart/CircleChart";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminProduct } from "../../redux/features/products";
import { fetchAdminOrder } from "../../redux/features/order";
import { fetchAdminAuth } from "../../redux/features/auth";
const DashDashboard = () => {
  let dispatch = useDispatch();
  const { adminProduct } = useSelector((state) => state.products);
  const { adminAuth } = useSelector((state) => state.auth);
  const { adminOrder } = useSelector((state) => state.order);
  const outOfStockProducts = adminProduct?.filter(
    (product) => product.stock === 0
  );
  const InOfStockProducts = adminProduct?.filter(
    (product) => product.stock !== 0
  );
  let totalOrder = adminOrder?.reduce((acc, cur) => {
    return acc + cur.totalPrice;
  }, 0);
  useEffect(() => {
    dispatch(fetchAdminProduct());
    dispatch(fetchAdminOrder());
    dispatch(fetchAdminAuth());
  }, [dispatch]);
  return (
    <Wrapper>
      <p>Dashboard</p>
      <div className="dashone">
        <p>Total Amount</p>
        <p>
          <Currency price={totalOrder} />
        </p>
      </div>
      <div className="dashtwo">
        <div className="dashCir">
          <p>Products</p>
          <p>{adminProduct?.length}</p>
        </div>
        <div className="dashCir">
          <p>Orders</p>
          <p>{adminOrder?.length}</p>
        </div>
        <div className="dashCir">
          <p>Users</p>
          <p>{adminAuth?.length}</p>
        </div>
      </div>
      <div className="dashthree">
        <GraphCart />
      </div>
      <div className="dashfour">
        <CircleChart
          outOfStock={outOfStockProducts?.length}
          inStock={InOfStockProducts?.length}
        />
      </div>
    </Wrapper>
  );
};

export default DashDashboard;

const Wrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 4rem;
  }
  .dashone {
    width: 90%;
    background-color: orangered;
    margin-bottom: 4rem;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    > p {
      font-size: 1.4rem;
      text-align: center;
      color: #ffffff;
    }
  }

  .dashtwo {
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;

    .dashCir {
      width: 20rem;
      height: 20rem;
      background-color: #8b0000;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > p {
        font-size: 1.6rem;
        color: #ffffff;
      }

      &:nth-child(2) {
        background-color: #8b8000;
      }
      &:nth-child(3) {
        background-color: black;
      }
    }
  }

  .dashthree {
    width: 90%;
    margin-bottom: 4rem;
  }
  .dashfour {
    width: 90%;
    margin-bottom: 4rem;
  }

  @media (min-width: 350px) and (max-width: 768px) {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 4rem;
    }
    .dashone {
      width:90%;
      background-color: orangered;
      margin-bottom: 4rem;
      height: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      > p {
        font-size: 1.4rem;
        text-align: center;
        color: #ffffff;
      }
    }

    .dashtwo {
      display: flex;
      width: 90%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0rem;
      flex-direction: column;

      .dashCir {
        width: 20rem;
        height: 20rem;
        background-color: #8b0000;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;

        > p {
          font-size: 1.6rem;
          color: #ffffff;
        }

        &:nth-child(2) {
          background-color: #8b8000;
        }
        &:nth-child(3) {
          background-color: black;
        }
      }
    }

    .dashthree {
      width: 90%;
      margin-bottom: 0rem;
    }
    .dashfour {
      width: 90%;
      margin-bottom: 0rem;
    }
  }
`;
