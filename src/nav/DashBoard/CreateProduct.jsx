import React, { useState, useRef } from "react";
import styled from "styled-components";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdOutlineLineWeight } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const CreateProduct = () => {
  const categoryArray = ["Tshirt", "Shirt", "Top", "Boxer", "Jeans", "Hoddie"];
  let imgRef = useRef();
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    images: [],
    brand: "",
  });
  let [errors, setErrors] = useState({});
  const [loadCir, setLoadCir] = useState(true);

  let validationForm = () => {
    const newErrors = {};

    // Name validation (required)
    if (!productDetails.name.trim()) {
      newErrors.name = "Name is required";
      toast("Name is required");
    } else if (productDetails.name.length < 3) {
      newErrors.name = "More than 3 characters required";
      toast("More than 3 characters required in name");
    }
    if (!productDetails.price.trim()) {
      newErrors.price = "Price is required";
      toast("Price is required");
    } else if (productDetails.price.length < 2) {
      newErrors.price = "More than 2 characters required";
      toast("More than 1 numbers required in price");
    } else if (isNaN(productDetails.price)) {
      newErrors.price = "Price must be numeric";
      toast("Price must be numeric");
    }
    if (!productDetails.brand.trim()) {
      newErrors.brand = "Brand is required";
      toast("Brand is required");
    } else if (productDetails.brand.length < 3) {
      newErrors.brand = "More than 3 characters required";
      toast("More than 3 characters required in brand");
    }
    if (!productDetails.category.trim()) {
      newErrors.category = "Category is required";
      toast("Category is required");
    } else if (productDetails.category.length < 3) {
      newErrors.category = "More than 3 characters required";
      toast("More than 3 characters required in category");
    }
    if (!productDetails.description.trim()) {
      newErrors.description = "Description is required";
      toast("Description is required");
    } else if (productDetails.description.length < 3) {
      newErrors.description = "More than 3 characters required in description";
      toast("More than 3 characters required");
    }
    if (productDetails.images.length === 0) {
      newErrors.images = "Images is required";
      toast("Images is required");
    }
    if (!productDetails.stock.trim()) {
      newErrors.stock = "Stock is required";
      toast("Stock is required");
    } else if (productDetails.stock.length < 2) {
      newErrors.stock = "More than 2 characters required";
      toast("More than 1 numbers required in stock");
    } else if (isNaN(productDetails.stock)) {
      newErrors.stock = "Stock must be numeric";
      toast("Stock must be numeric");
    }
    errors = newErrors;
    setErrors(errors);
    return Object.keys(newErrors).length === 0;
  };
  const GetInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProductDetails({ ...productDetails, [name]: value });
  };

  let handSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      setLoadCir(false);
      const res = await fetch("http://localhost:4000/api/products/admin/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(productDetails),
      });

      const data = await res.json();
      if (res.status === 200) {
        setProductDetails({
          name: "",
          price: "",
          stock: "",
          description: "",
          category: "",
          images: [],
          brand: "",
        });
        setLoadCir(true);
        toast("Product created sucessfully");
      } else if (
        data.message === "All Field are required" ||
        data.message === "Internal Server Error"
      ) {
        toast(data.message);
        setLoadCir(true);
      }
      try {
      } catch (error) {
        return error;
      }
    }
  };
  let handleFileChange = async (e) => {
    let files = e.target.files;
    if (files) {
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((base64Array) => {
        productDetails.images.push(...base64Array);
        setProductDetails({ ...productDetails });
      });
    }
  };
  let handleUpload = (e) => {
    e.preventDefault();
    imgRef.current.click();
  };
  return (
    <Wrapper>
      <p className="cpphere">Create Product</p>
      <div className="main-Div">
        <form method="post" action="">
          <div className="cpDiv">
            <TiSortAlphabeticallyOutline className="cpicon" />
            <input
              placeholder="Product Name"
              onChange={GetInput}
              value={productDetails.name}
              name="name"
            />
          </div>
          <div className="cpDiv">
            <GiClothes className="cpicon" />
            <input
              placeholder="Brand Name"
              onChange={GetInput}
              value={productDetails.brand}
              name="brand"
            />
          </div>
          <div className="cpDiv">
            <FaRupeeSign className="cpicon" />
            <input
              placeholder="Price"
              onChange={GetInput}
              value={productDetails.price}
              name="price"
            />
          </div>
          <div className="cpDiv">
            <MdDescription className="cpicon" />
            <input
              placeholder="Product Description"
              onChange={GetInput}
              value={productDetails.description}
              name="description"
            />
          </div>
          <div className="cpDiv">
            <MdCategory className="cpicon" />
            <select
              onChange={GetInput}
              value={productDetails.category}
              name="category"
            >
              {categoryArray.map((val, i) => {
                return (
                  <option key={i} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="cpDiv">
            <MdOutlineLineWeight className="cpicon" />
            <input
              placeholder="Stock"
              onChange={GetInput}
              value={productDetails.stock}
              name="stock"
            />
          </div>
          <button onClick={handleUpload} type="button" className="cpcbuts">
            Choose Files
          </button>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
            ref={imgRef}
          />
          <div className="cpimgdiv">
            {productDetails.images.map((val, i) => {
              return <img alt="icon" key={i} src={val} />;
            })}
          </div>
          <button className="cpcbuts" onClick={handSubmit}>
            Create
          </button>
          <span
            style={{ display: loadCir ? "none" : "block" }}
            className="spacp"
          >
            <Loading />
          </span>
        </form>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .cpphere {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  .main-Div {
    form {
      .spacp {
        position: absolute;
        bottom: 10rem;
        left: 40%;
      }
      border: 2px solid var(--dim);
      position: relative;
      width: 25vw;
      height: 75vh;
      display: flex;
      justify-content: space-between;
      padding: 2.5rem 0rem;
      align-items: center;
      flex-direction: column;
      .cpimgdiv {
        width: 20vw;
        display: flex;
        height: 8rem;
        justify-content: flex-start;
        align-items: center;
        border: 2px solid var(--dim);
        padding: 0.5rem 0rem;
        overflow: auto;
        img {
          width: 4rem;
          height: 4rem;
          margin: 0rem 0.5rem;
          border: 1px solid black;
        }
      }

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
        }
      }
    }
  }
`;
