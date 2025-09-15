import { useEffect, useRef, useState } from "react";
import Star from "../Helpers/icons/Star";
import Selectbox from "../Helpers/Selectbox";
import useFetchData from "../../hooks/fetchData";
import { addItem, decrementItem } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import Ads from "../Home/Ads";
import Tabs from "./tabs";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import BreadcrumbCom from "../BreadcrumbCom";
import card1 from "../../../public/assets/images/card-1.svg";
import card2 from "../../../public/assets/images/card-2.svg";
import card3 from "../../../public/assets/images/card-3.svg";
import card4 from "../../../public/assets/images/card-4.svg";
import whatsapp from "../../../public/assets/images/whatsapp.png";
import ReactImageMagnify from "react-image-magnify";
// import ReactImageZoom from "react-image-zoom";
import ReactPlayer from "react-player";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import logo from "../../../public/assets/images/logo.png";
import {
  notifyAddCartAr,
  notifyAddCartEn,
  notifyAddCartHe,
  notifyAddFavoriteAr,
  notifyAddFavoriteEn,
  notifyAddFavoriteHe,
} from "../Helpers/Toasts/NotifyAdd";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { addFavorite, removeFavorite } from "../../redux/favoriteSlice";
import {
  notifyRemoveFavoriteAr,
  notifyRemoveFavoriteEn,
  notifyRemoveFavoriteHe,
} from "../Helpers/Toasts/NotifyDelete";

export default function ProductView({
  className,
  reportHandler,
  data,
  onAddCart,
  onAddFavorite,
  onDecrement,
}) {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorit.items);
  const [src, setSrc] = useState(data?.product?.images?.[0]?.url);
  const [qty, setQTY] = useState(1);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [selectedPrice, setSelectedPrice] = useState("");
  const playerRef = useRef(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [actualPrice, setActualPrice] = useState("");
  const { data: data2, loading } = useFetchData("socials");
  const openDialog = () => {
    setOpen(true);
  };
  const handleAddFavorite = (item) => {
    const isFavorite = favorite.some(
      (favoriteItem) => favoriteItem.id === item.id
    );

    if (isFavorite) {
      const itemIndex = favorite.findIndex(
        (favoriteItem) => favoriteItem.id === item.id
      );
      dispatch(removeFavorite(itemIndex));
      {
        lang === "ar"
          ? notifyRemoveFavoriteAr()
          : lang === "en"
          ? notifyRemoveFavoriteEn()
          : notifyRemoveFavoriteHe();
      }
    } else {
      dispatch(addFavorite({ newItem: item }));
      {
        lang === "ar"
          ? notifyAddFavoriteAr()
          : lang === "en"
          ? notifyAddFavoriteEn()
          : notifyAddFavoriteHe();
      }
    }
  };

  const closeDialog = () => {
    setOpen(false);
  };
  const handleAddcart = (pro, quantity) => {
    console.log(selectedColor, data.product_colors?.length);
    const updatedProduct = {
      ...pro,
      price_nis: selectedPrice,
    };
    if (selectedPrice) {
      if (
        (data.product.product_colors?.length > 0 && selectedColor !== "") ||
        (data.product.product_sizes?.length > 0 && selectedSize !== "")
      ) {
        dispatch(
          addItem({
            newItem: {
              ...updatedProduct,
              selectedColor,
              quantity,
              selectedSize,
            },
          })
        );
      } else {
        dispatch(addItem({ newItem: { ...updatedProduct, quantity } }));
      }
    } else {
      if (
        (data.product.product_colors?.length > 0 && selectedColor !== "") ||
        (data.product.product_sizes?.length > 0 && selectedSize !== "")
      ) {
        console.log("saluuut");
        dispatch(
          addItem({
            newItem: { ...pro, selectedColor, quantity, selectedSize },
          })
        );
      } else {
        dispatch(addItem({ newItem: { ...pro, quantity } }));
      }
    }
    {
      lang === "ar"
        ? notifyAddCartAr()
        : lang === "en"
        ? notifyAddCartEn()
        : notifyAddCartHe();
    }
    openCartDrawer();
  };
  const changeImgHandler = (current) => {
    setSrc(current);
  };
  const handleDecrementItem = () => {
    if (qty > 0) {
      setQTY(qty - 1);
    }
  };
  const handleIncrementItem = () => {
    setQTY(qty + 1);
  };

  const isButtonDisabled = () => {
    if (data?.product?.product_sizes.length > 0 && selectedSize === "")
      return true;
    if (data?.product?.product_colors.length > 0 && selectedColor === "")
      return true;

    return false;
  };
  const isFavorite = favorite.some((item) => item.id === data?.product?.id);
  const [activeTab, setActiveTab] = useState("first");
  const lang = localStorage.getItem("i18nextLng");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const { openCartDrawer } = useCartDrawer();
  useEffect(() => {
    if (data.product?.is_offer === "true") {
      setSelectedPrice(
        data.product?.price_nis -
          (data.product?.price_nis * data.product?.discount_percentage) / 100
      );
      console.log(
        data.product?.price_nis -
          (data.product?.price_nis * data.product?.discount_percentage) / 100
      );
      setActualPrice(data?.product?.price_nis);
    }
  }, []);

  const message = lang === 'ar' ? 'مرحبا أنا مهتم بالمنتج التالي من موقع يولو، هل يمكنك تزويدي بمزيد من التفاصيل أو مساعدتي في طلبي\n'
  + `${data?.product?.price_nis} :السعر،${data?.product?.name_ar} :المنتج \n`
  + `تحقق من ذلك : https://yolo.ps/single-product/${data?.product?.id} \n`
  : 'Hello! I am interested in the following product from Yolo website, Could you please provide me with more details or assist me with my order?\n'
  + `Product name:  ${data?.product?.name_en}, price : ${data?.product?.price_nis}\n`
  + `Check it out: https://yolo.ps/single-product/${data?.product?.id} \n`;

const encodedMessage = encodeURIComponent(message)

  const props = {
    width: 400,
    height: 650,
    zoomWidth: 600,
    img: src ?? "",
    zoomPosition: "left",
  };

  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc(logo); // Fallback to your logo image on error
  };
  return (
    <div
      className={`product-view w-full lg:flex justify-between mt-[40px]  ${
        className || ""
      }`}
    >
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[10px] lg:mr-[10px]">
        <div className="w-full">
          <div className="w-full h-[550px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
            {data?.product?.images?.map((item, index) => (
              <div key={index}>
                {item.type === "video" ? (
                  src === item.url ? (
                    <ReactPlayer
                      url={src}
                      controls
                      width="100%"
                      // muted
                      playing
                      height="550px"
                      // onReady={captureThumbnail}
                    />
                  ) : null
                ) : src === item.url ? (
                  <div>
                    <div className="hidden xl:block">
                      <InnerImageZoom
                        src={src}
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = logo;
                        }}
                        zoomSrc={src}
                        zoomType="hover"
                        zoomPreload={true}
                      />
                    </div>
                    <div className="xl:hidden block">
                      <ModalImage large={src} small={src} />
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
            {data?.product?.product_colors?.map((item, index) => (
              <div key={index}>
                {src === item.color_image ? (
                  <div>
                    <div className="hidden xl:block">
                      <InnerImageZoom
                        src={src}
                        zoomSrc={src}
                        zoomType="hover"
                        zoomPreload={true}
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = logo;
                        }}
                      />
                    </div>
                    <div className="xl:hidden block">
                      <ModalImage
                        large={src}
                        small={src}
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = logo;
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {data?.product?.images &&
            data?.product?.images?.length > 0 &&
            data?.product?.images?.map((img) => (
              <div className="flex gap-2 flex-wrap">
                <div
                  onClick={() => changeImgHandler(img.url)}
                  key={img.id}
                  className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                >
                  {img.type === "video" ? (
                    <img
                      src="https://cdn.pixabay.com/photo/2014/10/09/13/14/video-481821_1280.png"
                      alt=""
                      className={`w-full h-full object-contain ${
                        src !== img.url ? "opacity-50" : ""
                      } `}
                    />
                  ) : (
                    <img
                      src={img.url}
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src = logo;
                      }}
                      alt=""
                      className={`w-full h-full object-contain ${
                        src !== img.url ? "opacity-50" : ""
                      } `}
                    />
                  )}
                </div>
              </div>
            ))}
          {data?.product?.product_colors &&
            data?.product?.product_colors?.length > 0 &&
            data?.product?.product_colors?.map((img) => (
              <div className="flex gap-2 flex-wrap">
                <div
                  onClick={() => changeImgHandler(img.color_image)}
                  key={img.id}
                  className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                >
                  {
                    <img
                      src={img.color_image}
                      alt=""
                      className={`w-full h-full object-contain ${
                        src !== img.color_image ? "opacity-50" : ""
                      } `}
                    />
                  }
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0 xl:mr-[40px]">
          <div className="breadcrumb-wrapper w-full ">
            <div className="">
              <BreadcrumbCom
                paths={[
                  { name: t("Home Page"), path: "/" },
                  { name: t("Product"), path: "" },
                  { name: data?.product?.name, path: "" },
                ]}
              />
            </div>
          </div>
          <span
            data-aos="fade-up"
            className="text-qgray md:text-[15px] text-xs font-normal uppercase tracking-wider mb-2 inline-block"
          >
            {/* {t("Category")} : {data?.product?.category_name} */}
          </span>
          <p
            data-aos="fade-up"
            className="md:text-[30px] text-xl text-black mb-[20px] font-bold mt-[30px]"
            style={{ lineHeight: "120%" }}
          >
            {lang === "ar"
              ? data?.product?.name_ar
              : lang === "en"
              ? data?.product?.name_en
              : data?.product?.name_he}
          </p>
          <div
            data-aos="fade-up"
            className="flex flex-col space-x-2  mt-[30px] mr-[20px] xl:mr-[0px]"
          >
            <span className="text-2xl font-500 text-black flex flex-col">
              {/* <h3 className="md:text-[22px] text-xl text-black mb-2  ml-[20px]">
                {t("Price")} :
              </h3> */}
              {/* <span className="text-xl font-500 text-qgray line-through ">
                {Number((data?.product?.price * 1.2).toFixed(2))}₪
              </span> */}
              {data?.product?.is_offer === "true" ? (
                <div style={{ display: "flex" }}>
                  <span className="offer-price text-qred font-600 text-[25px] ml-2 ">
                    ₪{selectedPrice}
                  </span>
                  <span className="main-price text-qgray line-through font-600 text-[18px] ml-4">
                    ₪{actualPrice}
                  </span>
                </div>
              ) : (
                <span className="text-[2.2rem]">
                  ₪{selectedPrice ? selectedPrice : data?.product?.price_nis}.00
                  {/* ₪{data?.product?.price}.00 */}
                </span>
              )}
            </span>
            <span
              style={{ lineHeight: "120%" }}
              className="mt-[30px] text-qgray md:text-[18px] text-xs font-normal uppercase tracking-wider mb-2 inline-block"
            >
              {lang === "ar"
                ? data?.product?.description_ar
                : lang === "en"
                ? data?.product?.description_en
                : data?.product?.description_he}
            </span>
            {data?.product?.product_sizes.length > 0 && (
              <div>
                <div className="mt-[1rem]">{t("sizes")}:</div>

                <span
                  style={{ lineHeight: "120%" }}
                  className="mt-[1rem] text-qgray md:text-[18px] text-xs font-normal uppercase tracking-wider mb-2 inline-block"
                >
                  {data.product.product_sizes.map((item, index) => (
                    <span
                      key={index}
                      style={
                        selectedSize === item.size
                          ? {
                              borderRadius: "10%",
                              border: "1px solid #1d1d1d",
                              height: "5px",
                              width: "5px",
                              padding: "0.5rem",
                              margin: "0.25rem",
                              cursor: "pointer",
                            }
                          : {
                              borderRadius: "10%",
                              border: "1px solid #efefef",
                              height: "5px",
                              width: "5px",
                              padding: "0.5rem",
                              margin: "0.25rem",
                              cursor: "pointer",
                            }
                      }
                      onClick={() => {
                        setSelectedSize(item.size);
                        if (data.product?.is_offer === "true") {
                          setSelectedPrice(
                            item.size_price_nis -
                              (item.size_price_nis *
                                data.product?.discount_percentage) /
                                100
                          );
                          console.log(
                            data.product?.price_nis -
                              (data.product?.price_nis *
                                data.product?.discount_percentage) /
                                100
                          );
                          setActualPrice(item.size_price_nis);
                        } else {
                          setSelectedPrice(item.size_price_nis);
                        }
                      }}
                    >
                      {item.size}
                    </span>
                  ))}
                </span>
              </div>
            )}
            {data?.product?.product_colors.length > 0 && (
              <div>
                <div className="mt-[1rem]">{t("colors")}:</div>
                <span
                  style={{ lineHeight: "120%", alignItems: "center" }}
                  className=" text-qgray md:text-[18px] text-xs font-normal uppercase tracking-wider mb-2 flex"
                >
                  <div className="xl:grid xl:grid-cols-7 grid-cols-3 gap-3 mb-[46px]">
                    {data.product.product_colors.map((item, index) => (
                      <div
                        className={`${
                          selectedColor === item.id && "text-black"
                        } flex flex-col justify-center items-center text-sm`}
                      >
                        <span
                          key={index}
                          className="rounded-full flex justify-center items-center h-[4rem] w-[4rem] m-1 p1"
                          style={
                            selectedColor === item.id
                              ? {
                                  border: "1px solid #1d1d1d",
                                  cursor: "pointer",
                                }
                              : {
                                  border: "1px solid #efefef",
                                  cursor: "pointer",
                                }
                          }
                          onClick={() => {
                            setSelectedColor(item.id);
                            changeImgHandler(item.color_image);
                          }}
                        >
                          <div
                            className="rounded-full "
                            style={{
                              height: "3.5rem",
                              width: "3.5rem",
                              backgroundColor: `${item.color}`,
                            }}
                          />
                        </span>
                        {item.color_code}
                      </div>
                    ))}
                  </div>
                </span>
              </div>
            )}
          </div>
          {/* <div data-aos="fade-up" className="colors mb-[20px] mt-[20px]">
          </div> */}
          <div className=" border border-[#EDEDED] mt-[30px] mb-[20px] m-1"></div>
          <div
            data-aos="fade-up"
            className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px] flex"
          >
            {/* <h3 className="md:text-[22px] text-sm text-main-colormb-2 font-bold ml-[20px]">
              الكمية
            </h3> */}
            <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border rounded-lg">
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => handleDecrementItem(data.product.id)}
                  type="button"
                  className="text-base text-qgray"
                >
                  -
                </button>
                <span className="text-qblack">{qty}</span>
                <button
                  onClick={() => handleIncrementItem(data?.product?.id)}
                  type="button"
                  className="text-base text-qgray"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex row h-[50px]">
              <div
                className="w-[60px] h-full flex justify-center items-center border border-qgray-border mr-[10px] rounded-lg"
                onClick={() => handleAddFavorite(data.product)}
              >
                <button type="button">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={isFavorite ? "#ef262c" : "none"}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                        stroke={isFavorite ? "#ef262c" : "#D5D5D5"}
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex-1 h-full mr-[10px]">
                <button
                  disabled={isButtonDisabled()}
                  onClick={() => handleAddcart(data?.product, qty)}
                  type="button"
                  className="black-btn text-sm font-semibold w-[215\px] xl:w-[150px] h-full rounded-lg"
                >
                  {t("Add to cart")}
                </button>
              </div>
              <div className="flex-1 h-full mr-[10px]">
                <a
                  href={`https://api.whatsapp.com/send?phone=${data2?.socials?.[2]?.url}&text=${encodedMessage}`}
                  type="button"
                  style={{ backgroundColor: "#46c957" }}
                  className="text-sm text-white font-semibold w-[215px] xl:w-[160px] h-full flex justify-center items-center rounded-lg"
                >
                  <img src={whatsapp} width={30} className="mx-1" />
                  {t("order whatsapp")}
                </a>
              </div>
            </div>
          </div>
          <div className=" border border-[#EDEDED] mt-[30px] mb-[20px]"></div>
          <div className="componentWrapper flex justify-center">
            <div className="header">{t("Payment Method")}</div>
            <div className="flex justify-center">
              {" "}
              <img
                src={card1}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card1"
                width={40}
                className="m-2"
              />
              <img
                src={card2}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card2"
                width={40}
                className="m-2"
              />
              <img
                src={card3}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card3"
                width={40}
                className="m-2"
              />
              <img
                src={card4}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card4"
                width={40}
                className="m-2"
              />
            </div>

            <div></div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}

      {/* {open && <Ads close={() => setOpen(false)} />} */}
    </div>
  );
}
