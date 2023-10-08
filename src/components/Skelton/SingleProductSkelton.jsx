import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleProductSkelton = () => {
  return (
    <Wrapper>
      <div className="imgDiv1">
        <Skeleton width={window.innerWidth<768?300:400} height={window.innerWidth<768?400:500} />
      </div>
      <div className="details-div">
        <Skeleton width={100} height={30} />
        <Skeleton width={400} height={30} />
        <Skeleton width={200} height={30} />
        <Skeleton width={300} height={30} />
        <Skeleton width={200} height={30} />
        <Skeleton width={200} height={30} />
        <Skeleton width={200} height={30} />
        <Skeleton width={200} height={30} />
        <Skeleton width={150} height={50} />
      </div>
    </Wrapper>
  );
};

export default SingleProductSkelton;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .imgDiv1 {
    .lazy-load-image-background {
      img {
      }
    }
  }
  .details-div {
    .name {
    }

    .des {
    }

    .price-div {
      .inner {
        .mrp {
          span {
          }
        }

        .dis {
        }
        .price {
        }
      }
      .tax {
      }
    }

    .line {
    }

    .avail {
      span {
      }
    }

    .main-count {
      .count {
        button {
          .add {
          }

          .minus {
          }
        }

        p {
        }
      }
      .buts {
      }
    }

    .star-and-review {
      .line-div {
        span {
        }
        .star-icon {
        }
      }
      span {
      }
      .star-icon {
      }
    }
  }

  @media (min-width: 370px) and (max-width: 768px) {

      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      .imgDiv1 {
        width: 30rem;
        height: 40rem;
        .lazy-load-image-background {
          img {
          }
        }
      }
      .details-div {
        width: 90vw;
        height: 50vh;
        display: flex;
        flex-direction: column;

        .name {
        }

        .des {
          font-size: 1.8rem;
        }

        .price-div {
          .inner {
            .mrp {
              span {
              }
            }

            .dis {
            }
            .price {
            }
          }
          .tax {
          }
        }

        .line {
          &::after {
            position: absolute;
            content: "";
            width: 90vw;
            height: 100%;
            top: 1.5rem;
            left: 0;
            border-bottom: 2px solid var(--dim);
          }
        }

        .avail {
          span {
          }
        }

        .main-count {
          .count {
            button {
              .add {
              }

              .minus {
              }
            }

            p {
            }
          }
          .buts {
          }
        }

        .star-and-review {
          padding: 0.4rem 1rem;
          width: 15rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 2px solid var(--dim);
          font-size: 1.6rem;
          position: relative;

          &::after {
            position: absolute;
            content: "";
            width: 90vw;
            height: 100%;
            top: 1.5rem;
            left: 0;
            border-bottom: 2px solid var(--dim);
          }

          .line-div {
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              font-size: 1.6rem;
              font-weight: 500;
              width: fit-content;
            }
            .star-icon {
              color: orangered;
              font-size: 1.6rem;
              margin-left: 0.5rem;
            }
          }
          span {
            font-size: 1.6rem;
            font-weight: 500;

            &:nth-child(1) {
              font-weight: 600;
            }
            &:nth-child(2) {
              color: var(--dim);
            }
            &:nth-child(3) {
              color: var(--dim);
            }
          }
          .star-icon {
            color: orangered;
            font-size: 1.4rem;
          }
        }
      }
    }
`;
