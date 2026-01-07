import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { useState } from "react";

// import "../styles/style.css";
import type { productType } from "../types/productType";
import Card from "./Card";
import Table from "./Table";

const login = () => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;

  // * 設定全域baseURL
  const api = axios.create({
    baseURL: API_BASE,
  });

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  // week1
  const [selectProduct, setSelectProduct] = useState<productType | null>(null);
  const [products, setProducts] = useState([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      let res = await api.post(`/v2/admin/signin`, account);
      const { token, expired } = res.data;
      document.cookie = `someCookieName=${token}; expires=${new Date(expired)}`;
      api.defaults.headers.common["Authorization"] = token;
      getProducts();
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      console.log(error);
    }
  };

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((preData) => {
      const { name, value } = e.target;
      return { ...preData, [name]: value };
    });
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((preData) => {
      const { name, value } = e.target;
      return { ...preData, [name]: value };
    });
  };

  const checkLoginStatus = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      api.defaults.headers.common["Authorization"] = token;
      let response = await api.post("/v2/api/user/check");
      if (response.status === 200) {
        console.log("檢查登入狀態 200 OK");
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      // const token = document.cookie
      //   .split(";")
      //   .find((txt) => txt.startsWith("someCookieName="))
      //   ?.split("=")[1];
      // axios.defaults.headers.common["Authorization"] = token;
      const response = await api.get(`/v2/api/${API_PATH}/admin/products`);
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      {!isAuth ? (
        // 沒有登入的狀態
        <div className="container mt-5 ">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-3">
              <form
                onSubmit={(e) => {
                  onSubmit(e);
                }}
              >
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={account.username}
                    onChange={changeUserName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={account.password}
                    onChange={changePassword}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        // 有登入的狀態
        <div className="container mt-5">
          <div className="row row-cols-2">
            <div className="col">
              {/* 確認登入狀態 */}
              {/* <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  checkLoginStatus();
                }}
              >
                確認登入狀態
              </button> */}
              {/* 左側列表 */}
              <Table
                products={products}
                setSelectProduct={setSelectProduct}
                checkLoginStatus={checkLoginStatus}
              />
            </div>
            <div className="col">
              {/* 右側列表 */}
              {selectProduct && (
                <React.Fragment>
                  <div className="fs-2">商品明細</div>
                  <Card selectProduct={selectProduct} />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default login;
