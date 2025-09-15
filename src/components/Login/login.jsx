import { useEffect, useState } from "react";
import productDatas from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import useFetchData from "../../hooks/fetchData";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCardStyleThree from "../Helpers/Cards/ProductCardStyleThree";
// import image from '../../../public/assets/images/saller-7.png'
import image from "../../../public/assets/images/saller-7.png";
import { useSelector } from "react-redux";
import PageTitle from "../Helpers/PageTitle";
import { useTranslation } from "react-i18next";
import FilterBar from "../FilterBar/FilterBar";
import axios from "axios";
import Pagination from "../Helpers/Pagination";
import useFilterData from "../../hooks/filterData";
import FilterDialog from "../FilterBar/FilterDialog";
import logo from "../../../public/assets/images/logo.png";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";

export default function LoginPage() {
  //   const { data: data2, loading: loading2 } = useFetchData(
  //     `filter_products?brand_id=${param.id}&page=${currentPage}`
  //   );
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const login = async () => {
    console.log("entered login");
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      console.log("directly before post");
      const response = await axios.post(
        `https://yolo.ps/admin/api/login`,
        {
          phone: phone,
          password: password,
        },
        { headers }
      );
      console.log(response);
      if (response.status === 200) {
        // Successful login
        const token = response.data.access_token;
        const status = response.data.status;
        const { name, id } = response.data.id;
        localStorage.setItem("yolo_access_token", JSON.stringify(token));
        localStorage.setItem("yolo_name", JSON.stringify(name));
        localStorage.setItem("yolo_id", JSON.stringify(id));
        localStorage.setItem("yolo_log_status", JSON.stringify(status));
        navigate('/')
      } else {
        console.log("Invalid login details");
      }
    } catch (error) {
      console.error(error);
      setIsErrorOpen(true);
    }
    // }
  };

  return (
    <>
      <div className="flex justify-center items-center container-x mx-auto mt-[15vh] xl:mt-[25vh] sm:mt-[15vh]">
        <div className=" p-2 w-[90vw] xl:w-[25vw] sm:w-[90vw]">
          <div className="text-2xl font-bold w-full text-center">
            <img src={logo} width={100} className="absolute top-1 right-10" />
            {t("login")}
          </div>
          <div className="">
            <label>{t("Phone")}</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-lg p-3 flex items-center mx-1 w-full text-sm m-2"
            />
            <label>{t("password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg p-3 flex items-center mx-1 w-full text-sm m-2"
            />
            <button onClick={login} className="w-full my-3 mx-1 bg-black text-white rounded-md p-2">
              {t("login")}
            </button>
            <div className="flex items-center justify-center">
              <div className="border-b-qgray border-b mx-1 w-[25%]" />
              <div>{t("don't have an account?")}</div>
              <div className="border-b-qgray border-b mx-1 w-[25%]" />
            </div>
            <div className="text-center text-qgray/90 my-2">
              {t(
                "an account will be created automatically once you order for the first time"
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogStyle"
      >
        <DialogContent>
          <div className="text-center">
            <p>
              {t(
                "phone number or password is incorrect, check and try again"
              )}
            </p>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center items-center">
          <button
            onClick={() => {
              setIsErrorOpen(false);
            }}
            className="rounded-lg"
            style={{
              marginTop: "1rem",
              width: "25%",

              padding: "0.5rem",
            }}
          >
            <span className="dialogStyle">{t("ok")}</span>
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
