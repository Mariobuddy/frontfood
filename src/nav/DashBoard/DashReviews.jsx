import React, { useState,useEffect,useMemo} from "react";
import { styled } from "styled-components";
import { MdOutlineReviews } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';
import { fetchReview } from "../../redux/features/products";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTable, useSortBy, usePagination } from "react-table";
import Loading from "../../components/Loading/Loading";



const DashReviews = () => {
  let dispatch=useDispatch();
  const [productId, setProductId] = useState("");
  const {userReview}=useSelector((state)=>state.products);
  console.log(userReview);
  let changeId = (e) => {
    setProductId(e.target.value);
  };
  let handSubmit=(e)=>{
    console.log(productId);
    e.preventDefault();
    if(productId){
       dispatch(fetchReview(productId));
    }
  }
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
        <button
          className="cpcbuts"
          onClick={handSubmit}
        >
          SEARCH
        </button>
      </div>
      <div className="rwbottom">
        {
          userReview.length!==0?<>
          
          </>:<p className="nfr">No Review Found</p>
        }
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

  .rwbottom{
    margin-top: 2rem;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;

    .nfr{
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
`;
