import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import usePostData from "../../hooks/postData";
import { ToastContainer, toast } from "react-toastify";
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  notifyConfirmOrderAr,
  notifyConfirmOrderEn,
  notifyConfirmOrderHe,
} from "../Helpers/Toasts/NotifyAdd";
import {
  notifyNotConfirmOrderAr,
  notifyNotConfirmOrderEn,
  notifyNotConfirmOrderHe,
} from "../Helpers/Toasts/NotifyDelete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
} from "@material-ui/core";
import axios from "axios";

const notifyAdd = () =>
  toast(t("order confirmed successfully"), {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    style: {
      backgroundColor: "rgb(45 111 109)",
      color: "white",
      textAlign: "center",
    },
  });

const notifyError = () =>
  toast(t("failed to confirm order"), {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    style: {
      backgroundColor: "#ff3a31",
      color: "white",
      textAlign: "center",
    },
  });
export default function CheakoutPage() {
  const dispatch = useDispatch();
  const [markerPosition, setMarkerPosition] = useState({ lng: 0, lat: 0 });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCbU4UQT_reh3zLwsTZDYLmRrpseZQUGfw" || "",
  });
  // const handleMapClick = (event) => {
  //   setMarkerPosition({
  //     lng: event.latLng.lng(),
  //     lat: event.latLng.lat(),
  //   });
  // };

  const lang = localStorage.getItem("i18nextLng");

  const cart = useSelector((state) => state.cart.value);
  const [city, setCity] = useState(localStorage.getItem("form_city") || "");
  const [phone, setPhone] = useState(localStorage.getItem("form_phone") || "");
  const [area, setArea] = useState(localStorage.getItem("form_area") || "");
  const [near, setNear] = useState(localStorage.getItem("form_near") || "");
  const [note, setNote] = useState("");
  const [name, setName] = useState(localStorage.getItem("form_name") || "");
  const [shippingCost, setShippingCost] = useState(
    JSON.parse(localStorage.getItem("form_shippingcost")) || ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [emptyPhone, setEmptyPhone] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyCity, setEmptyCity] = useState(false);
  const [emptyNear, setEmptyNear] = useState(false);
  const [emptyArea, setEmptyArea] = useState(false);
  const [emptyShippingCost, setEmptyShippingCost] = useState(false);
  const [fillPhone, setfillPhone] = useState(false);
  const [fillName, setfillName] = useState(false);
  const [fillCity, setfillCity] = useState(false);
  const [fillNear, setfillNear] = useState(false);
  const [fillArea, setfillArea] = useState(false);
  const [fillShippingCost, setfillShippingCost] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [phoneExist, setPhoneExist] = useState(false);
  const [loginRequiredModal, setLoginRequiredModal] = useState(false);
  const log_status = JSON.parse(localStorage.getItem("yolo_log_status"));
  const [phoneIncorrect, setPhoneIncorrect] = useState(false)

  const handleChangePhone = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric characters and limit length to 8
    if (
      /^\d*$/.test(inputValue) &&
      inputValue.length <= 8
    ) {
      setPhone(inputValue);
    } 
  };

  const handleChangeName = (e) => {
    const inputValue = e.target.value;

    if (/^[a-zA-Z]*$/.test(inputValue)) {
      setName(inputValue);
    }
  };

  console.log(cart);

  const handleSubmitOrder = async () => {
    const requiredFields = [];
    if (!name) {
      requiredFields.push(t("Name"));
      setEmptyName(true);
    }
    if (!phone) {
      requiredFields.push(t("Phone"));
      setEmptyPhone(true);
    }
    if (!city) {
      requiredFields.push(t("City"));
      setEmptyCity(true);
    }
    if (!area) {
      requiredFields.push(t("Region"));
      setEmptyArea(true);
    }
    // if (!near) {
    //   requiredFields.push(t("Near"));
    //   setEmptyNear(true);
    // }
    if (!shippingCost) {
      requiredFields.push(t("Area (Interior, Jerusalem, West Bank)"));
      setEmptyShippingCost(true);
    }
    if (requiredFields.length > 0) {
      const errorMessage = `${t(
        "Please fill out the following fields"
      )}   : ${requiredFields.join(", ")}`;
      setErrorMessage(errorMessage);
    } else {
      try {
        const response = await axios.get(
          `https://yolo.ps/admin/api/check_phone?phone=05${phone}`
        );
        console.log(response.data.message);
        if (response.data.message === "Phone number is available.") {
          setPhoneExist(false);
          setIsPasswordDialogOpen(true);
        } else {
          setPhoneExist(true);
          if (log_status === "true") {
            handleAddOrder();
          } else {
            setLoginRequiredModal(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (name) {
      setfillName(true);
    }
    if (phone) {
      setfillPhone(true);
    }
    if (city) {
      setfillCity(true);
    }
    if (near) {
      setfillNear(true);
    }
    if (shippingCost) {
      setfillShippingCost(true);
    }
    if (area) {
      setfillArea(true);
    }
  }, [name, phone, city, near, shippingCost, area]);

  const handleAddAccount = async () => {
    const fullPhone = '05' + phone

    const formData = new FormData();
    formData.append("phone", fullPhone);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("email", "");
    formData.append("role_id", 2);
    const resGet = await axios
      .post(`https://yolo.ps/admin/api/register`, formData)
      .then((response) => {
        console.log("heeyyy");
        login();
        console.log("helllooo");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddOrder = async () => {
    const fullPhone = '05' + phone

    localStorage.setItem("form_phone", phone);
    localStorage.setItem("form_name", name);
    localStorage.setItem("form_city", city);
    localStorage.setItem("form_area", area);
    localStorage.setItem("form_near", near);
    localStorage.setItem("form_shippingcost", JSON.stringify(shippingCost));
    const formData = new FormData();
    const sum = cart?.reduce(
      (acc, item) => acc + item.price_nis * item.quantity,
      0
    );

    formData.append("phone", fullPhone);
    formData.append("customer_name", name);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("near", near);
    formData.append("note", note);
    formData.append("user_id", JSON.parse(localStorage.getItem("yolo_id")));
    if (markerPosition && markerPosition.lat && markerPosition.lng) {
      formData.append("lattitude", markerPosition.lat);
      formData.append("longitude", markerPosition.lng);
    } else {
      formData.append("lattitude", "0");
      formData.append("longitude", "0");
    }
    formData.append("geoarea", shippingCost.text);
    formData.append("delivery_price", shippingCost.price);
    formData.append("customer_name", name);
    formData.append("sum", sum);
    // formData.append("status", 'pending');

    // console.log(cart);
    cart?.forEach((element, index) => {
      console.log(element);
      formData.append(`product_id[${index}]`, element.id);
      formData.append(`price[${index}]`, element.price_nis);
      formData.append(`qty[${index}]`, element.quantity);
      formData.append(`selected_color[${index}]`, element.selectedColor);
      formData.append(`selected_size[${index}]`, element.selectedSize);
    });

    try {
      const resposne = await usePostData("add_order", formData);
      dispatch(clearCart());
      setPhone("");
      setArea("");
      setCity("");
      setNear("");
      setNote("");
      setName("");
      {
        lang === "ar"
          ? notifyConfirmOrderAr()
          : lang === "en"
          ? notifyConfirmOrderEn()
          : notifyConfirmOrderHe();
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      {
        lang === "ar"
          ? notifyNotConfirmOrderAr()
          : lang === "en"
          ? notifyNotConfirmOrderEn()
          : notifyNotConfirmOrderHe();
      }
    }
  };

  const login = async () => {
    console.log("entered login");
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      console.log("directly before post");
      const fullPhone = '05' + phone
      console.log(fullPhone)
      const response = await axios.post(
        `https://yolo.ps/admin/api/login`,
        {
          phone: fullPhone,
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
        handleAddOrder();
      } else {
        console.log("Invalid login details");
      }
    } catch (error) {
      console.error(error);
    }
    // }
  };

  const handleClickGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMarkerPosition(
          {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          },
          (error) => console.error(error)
        );
      });
    }
  };
  const handleSelectChange = (e) => {
    const selectedText = e.target.options[e.target.selectedIndex].text;
    const selectedValue = e.target.value;
    setShippingCost({ text: selectedText, price: selectedValue });
    setEmptyShippingCost(false);
  };
  console.log(shippingCost);

  return (
    <LayoutHomeTwo childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title={t("Checkout")}
            breadcrumb={[
              { name: t("Home Page"), path: "/" },
              { name: t("Checkout"), path: "/checkout" },
            ]}
          />
        </div>
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full sm:mb-10 mb-5"></div>
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  {t("Contact Information")}
                </h1>
                <div className="form-area">
                  <form>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0 xl:ml-[20px]">
                        <InputCom
                          label={t("Name")}
                          placeholder={t("Name")}
                          inputClasses="w-full h-[70px]"
                          isEmpty={emptyName}
                          value={name}
                          inputHandler={(e) => {
                            handleChangeName(e)
                            setEmptyName(false);
                          }}
                          isFill={fillName}
                        />
                      </div>
                      <div className="flex-1">
                        <InputCom
                          label={t("Phone")}
                          placeholder={t("Phone")}
                          inputClasses="w-full h-[70px]"
                          value={phone}
                          inputHandler={(e) => {
                            handleChangePhone(e);
                            setEmptyPhone(false);
                          }}
                          name="phone"
                          isEmpty={emptyPhone}
                          isFill={phone.length === 10}
                          isPhone = {true}

                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0 xl:ml-[20px]">
                        <label className="text-qgray text-[13px] font-bold ">
                          {t("Select a region")}
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </label>
                        <div
                          className={`input-wrapper border ${
                            emptyShippingCost
                              ? "bg-[#faeaeb] transition-all duration-300"
                              : fillShippingCost
                              ? "bg-[#ddf9e2]"
                              : "border-gray-400"
                          } w-full h-full overflow-hidden relative rounded mt-[10px]`}
                        >
                          <select
                            onChange={handleSelectChange}
                            value={shippingCost.price}
                            id="countries"
                            className={`input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal ${
                              emptyShippingCost
                                ? "bg-[#faeaeb]"
                                : fillShippingCost
                                ? "bg-[#ddf9e2]"
                                : "bg-white"
                            }  focus:ring-0 focus:outline-none`}
                          >
                            <option disabled selected>
                              {t("Select a region")}
                            </option>
                            <option value="30">القدس</option>
                            <option value="20">الضفة الغربية</option>
                            <option value="70">الداخل</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex-1">
                        <InputCom
                          label={t("City")}
                          placeholder={t("City")}
                          inputClasses="w-full h-[70px]"
                          name="city"
                          value={city}
                          inputHandler={(e) => {
                            setCity(e.target.value);
                            setEmptyCity(false);
                          }}
                          isEmpty={emptyCity}
                          isFill={fillCity}
                        />
                      </div>
                    </div>

                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0 xl:ml-[20px]">
                        <InputCom
                          label={t("Area")}
                          placeholder={t("Area")}
                          inputClasses="w-full h-[70px]"
                          name="area"
                          value={area}
                          inputHandler={(e) => {
                            setArea(e.target.value);
                            setEmptyArea(false);
                          }}
                          isEmpty={emptyArea}
                          isFill={fillArea}
                        />
                      </div>
                      <div className="sm:w-1/2  mb-5 sm:mb-0 xl:ml-[20px]">
                        <InputCom
                          label={t("Near")}
                          placeholder={t("Near")}
                          inputClasses="w-full h-[70px]"
                          name="near"
                          value={near}
                          inputHandler={(e) => {
                            setNear(e.target.value);
                            setEmptyNear(false);
                          }}
                          required = {false}
                          isEmpty={emptyNear}
                          isFill={fillNear}
                        />
                      </div>
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="mb-5">
                        <h6 className="text-qgray text-[13px] font-bold ">
                          {t("Notes")}
                        </h6>
                        <textarea
                          name="note"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder={t("Type your message here")}
                          className="w-full h-[105px] focus:ring-0 focus:outline-none p-3 border border-gray-400 placeholder:text-sm mt-[10px]"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  {t("Invoice details")}
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        {t("Product")}
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        {t("Total")}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    <ul className="flex flex-col space-y-5">
                      {cart?.map((item, index) => (
                        <li>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-[15px] text-qblack mb-2.5">
                                {lang === "ar"
                                  ? item.name_ar
                                  : lang === "en"
                                  ? item.name_en
                                  : item.name_he}

                                <sup className="text-[13px] text-qgray ml-2 mt-2">
                                  x{item.quantity}
                                </sup>
                              </h4>
                            </div>
                            <div>
                              <span className="text-[15px] text-qblack font-medium">
                                ₪ {item.price_nis}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">
                        {t("Total")}
                      </p>
                      <p className="text-2xl font-medium text-qred">
                        ₪
                        {cart?.reduce(
                          (acc, item) => acc + item.price_nis * item.quantity,
                          0
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  <div className="mt-[30px]">
                    {/* {shippingCost && ( */}
                    <div className=" flex justify-between mb-5">
                      <p className="text-xl font-medium text-qblack">
                        {t("Delivery price")}
                      </p>
                      <br />

                      <p className="text-2xl font-medium text-qred">
                        {" "}
                        ₪{shippingCost.price}
                      </p>
                    </div>
                    {/* )} */}
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  <div className="mt-[30px]">
                    {shippingCost && (
                      <div className=" flex justify-between mb-5">
                        <p className="text-xl font-medium text-qblack">
                          {t("Total price of the order")}
                        </p>
                        <br />
                        <p className="text-sm font-medium text-qblack">
                          {t("Total")} +{t("Delivery price")}
                        </p>
                        <p className="text-2xl font-medium text-qred">
                          {" "}
                          ₪
                          {cart?.reduce(
                            (acc, item) => acc + item.price_nis * item.quantity,
                            0
                          ) + Number(shippingCost.price)}
                        </p>
                      </div>
                    )}
                  </div>
                  {errorMessage && (
                    <div
                      className="mb-[30px]"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {errorMessage}
                    </div>
                  )}
                  {phoneIncorrect && (
                    <div
                      className="mb-[30px]"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {t("phone number must start with 05")}
                    </div>
                  )}
                  <div
                    className="w-full h-[50px] black-btn flex justify-center items-center cursor-pointer"
                    onClick={handleSubmitOrder}
                  >
                    <span className="text-sm font-semibold">
                      {" "}
                      {t("Confirmation")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
      <Dialog
        open={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogStyle"
      >
        <DialogContent>
          <div className="text-center">
            <p>
              {t(
                "a new account will be created automatically using your entered phone number"
              )}
            </p>
            <p>{t("enter a password for your account")}</p>

            <input
              className="border rounded-lg p-3 flex items-center mx-1 w-full text-sm m-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password")}
            />
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center items-center">
          <button
            className="rounded-lg"
            style={{
              backgroundColor: "#1d1d1d",
              marginTop: "1rem",
              width: "25%",
              color: "white",
              padding: "0.5rem",
            }}
            disabled={password.trim() === "" ? true : false}
            onClick={() => {
              handleAddAccount();
              setIsPasswordDialogOpen(false);
            }}
          >
            {t("confirm")}
          </button>
          <button
            onClick={() => {
              setIsPasswordDialogOpen(false);
            }}
            className="rounded-lg"
            style={{
              marginTop: "1rem",
              width: "25%",

              padding: "0.5rem",
            }}
          >
            <span className="dialogStyle">{t("cancel")}</span>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={loginRequiredModal}
        onClose={() => setLoginRequiredModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogStyle"
      >
        <DialogContent>
          <div className="text-center">
            <p>{t("there is an account attached to this phone number")}</p>
            <p>{t("please login to your account first")}</p>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center items-center">
          <button
            className="rounded-lg"
            style={{
              backgroundColor: "#1d1d1d",
              marginTop: "1rem",
              // width: "70%",
              color: "white",
              padding: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/login-customer");
            }}
          >
            {t("go to login")}
          </button>
          <button
            onClick={() => {
              setLoginRequiredModal(false);
            }}
            className="rounded-lg"
            style={{
              marginTop: "1rem",
              width: "25%",

              padding: "0.5rem",
            }}
          >
            <span className="dialogStyle">{t("cancel")}</span>
          </button>
        </DialogActions>
      </Dialog>
    </LayoutHomeTwo>
  );
}
