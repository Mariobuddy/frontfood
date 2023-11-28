import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading/Loading";
import { useSelector } from "react-redux";
const LazyHome = lazy(() => import("./nav/Home/Home"));
const LazyPageNotFound = lazy(() => import("./nav/404/PageNotFound"));
const LazyProduct = lazy(() => import("./nav/Product/Product"));
const LazyDashUpdateProduct = lazy(() =>
  import("./nav/DashBoard/DashUpdateProduct")
);
const LazyPaymentWrapper = lazy(() =>
  import("./nav/PaymentGateway/PaymentWrapper")
);
const LazyPaymentSucess = lazy(() =>
  import("./nav/PaymentSucess/PaymentSucess")
);

const LazySingleProduct = lazy(() =>
  import("./nav/SingleProducts/SingleProducts")
);
const LazySingleOrder = lazy(() => import("./nav/SingleOrder/SingleOrder"));
const LazyContact = lazy(() => import("./nav/Contact/Contact"));
const LazyCart = lazy(() => import("./nav/Cart/Cart"));
const LazyDashboard = lazy(() => import("./nav/DashBoard/DashBoard"));
const LazyShipping = lazy(() => import("./nav/Shipping/Shipping"));
const LazyConfirmOrder = lazy(() => import("./nav/OrderConfirm/OrderConfirm"));
const LazyMyOrder = lazy(() => import("./nav/Myorder/Myorder"));
const LazyAdminDashDashboard = lazy(() =>
  import("./nav/DashBoard/DashDashboard")
);
const LazyAdminCreateProduct = lazy(() =>
  import("./nav/DashBoard/CreateProduct")
);
const LazyAdminViewProduct = lazy(() => import("./nav/DashBoard/ViewProduct"));
const LazyAdminOrders = lazy(() => import("./nav/DashBoard/DashOrders"));
const LazyAdminReviews = lazy(() => import("./nav/DashBoard/DashReviews"));
const LazyAdminUsers = lazy(() => import("./nav/DashBoard/DashUser"));

const LazyChangePassword = lazy(() =>
  import("./nav/ChangePassword/ChangePassword")
);
const LazyProfile = lazy(() => import("./nav/Profile/Profile"));
const LazyEditProfile = lazy(() => import("./nav/EditProfile/EditProfile"));
const LazyLogin = lazy(() => import("./nav/Login/Login"));
const LazyRegister = lazy(() => import("./nav/Register/Register"));
const LazyForgotPassword = lazy(() =>
  import("./nav/ForgotPassword/ForgotPassword")
);
const LazyResetPassword = lazy(() =>
  import("./nav/ResetPassword/ResetPassword")
);

function App() {
  const { isAuth, isAdmin } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Wrapper>
        <div className="invis">
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggables
            pauseOnHover
            theme="dark"
          />
        </div>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loading />
                  </div>
                }
              >
                <LazyHome />
              </Suspense>
            }
          />
          {/* ---------------------------Not Login-------------------------------- */}

          <Route
            exact
            path="/login"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loading />
                  </div>
                }
              >
                <LazyLogin />
              </Suspense>
            }
          />
          <Route
            exact
            path="/forgotpassword"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loading />
                  </div>
                }
              >
                <LazyForgotPassword />
              </Suspense>
            }
          />
          <Route
            exact
            path="/resetpassword/:token"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loading />
                  </div>
                }
              >
                <LazyResetPassword />
              </Suspense>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loading />
                  </div>
                }
              >
                <LazyRegister />
              </Suspense>
            }
          />

          {/* -----------------------------Protected Routes-------------------------------- */}

          <Route
            path="/protected"
            element={<ProtectedRoutes isAuth={isAuth} />}
          >
            <Route
              exact
              path="profile"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyProfile />
                </Suspense>
              }
            />
            <Route
              exact
              path="product"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyProduct />
                </Suspense>
              }
            />
            <Route
              exact
              path="paymentsucess"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyPaymentSucess />
                </Suspense>
              }
            />
            <Route
              exact
              path="paymentgateway"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyPaymentWrapper />
                </Suspense>
              }
            />
            <Route
              exact
              path="contact"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyContact />
                </Suspense>
              }
            />
            <Route
              exact
              path="cart"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyCart />
                </Suspense>
              }
            />
            <Route
              exact
              path="order/confirm"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyConfirmOrder />
                </Suspense>
              }
            />
            <Route
              exact
              path="singleorderget/:id"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazySingleOrder />
                </Suspense>
              }
            />
            <Route
              exact
              path="myorderfront"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyMyOrder />
                </Suspense>
              }
            />
            <Route
              exact
              path="shipping"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyShipping />
                </Suspense>
              }
            />
            <Route
              exact
              path="api/products/:id"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazySingleProduct />
                </Suspense>
              }
            />
            <Route
              exact
              path="editprofile"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyEditProfile />
                </Suspense>
              }
            />
            <Route
              exact
              path="changepassword"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyChangePassword />
                </Suspense>
              }
            />
          </Route>

          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoutes
                isAuth={isAuth}
                adminRoute={true}
                isAdmin={isAdmin === "admin"}
              >
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyDashboard />
                </Suspense>
              </ProtectedRoutes>
            }
          >
            <Route
              index
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyAdminDashDashboard />
                </Suspense>
              }
            />
            <Route
              path="dashdashboard"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyAdminDashDashboard />
                </Suspense>
              }
            />
            <Route
              path="dashorders"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyAdminOrders />
                </Suspense>
              }
            />
            <Route
              path="dashupdateproduct/:id"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyDashUpdateProduct />
                </Suspense>
              }
            />
            <Route
              path="dashusers"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyAdminUsers />
                </Suspense>
              }
            />
            <Route
              path="dashreviews"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyAdminReviews />
                </Suspense>
              }
            />
            <Route
              path="dashcreateproduct"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyAdminCreateProduct />
                </Suspense>
              }
            />
            <Route
              path="dashviewproduct"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loading />
                    </div>
                  }
                >
                  <LazyAdminViewProduct />
                </Suspense>
              }
            />
          </Route>

          <Route
            exact
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loading />
                  </div>
                }
              >
                <LazyPageNotFound />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .invis {
    position: absolute;
  }

  .cirDiv {
    position: absolute;
    top: 45%;
    left: 50%;
  }
`;
