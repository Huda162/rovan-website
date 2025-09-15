import { useState } from "react";
import Compair from "../../Helpers/icons/Compair";
import ThinLove from "../../Helpers/icons/ThinLove";
import { Link } from "react-router-dom";
import useFetchData from "../../../hooks/fetchData";
import { useSelector } from "react-redux";
import i18n from "i18next";
import LanguageSwitchIcon from "../../Helpers/icons/Language";
import { useTranslation } from "react-i18next";
import language from "../../../../public/assets/images/language.svg";
import userIcon from "../../../../public/assets/images/user.png";

export default function Drawer({ className, open, action }) {
  const [tab, setTab] = useState("menu");
  const { data, loading } = useFetchData("categories");
  const favorite = useSelector((state) => state.favorit.items);
  const [toggleLang, setToggleLang] = useState(false);
  const lang = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();
  const logStatus = JSON.parse(localStorage.getItem('yolo_log_status'));

  const { data: data2, loading: loading2 } = useFetchData("socials");

  document.body.dir = i18n.dir();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
    const language = localStorage.setItem("language", lng);
    setToggleLang(false);
  };

  return (
    <>
      <div
        className={`drawer-wrapper w-full  h-full relative block  ${
          className || ""
        }`}
      >
        {open && (
          <div
            onClick={action}
            className="w-full h-screen bg-black bg-opacity-40 z-40 left-0 top-0 fixed"
          ></div>
        )}
        <div
          className={`w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed top-0 z-50 ${
            open ? "right-0" : "-left-[280px]"
          }`}
        >
          <div className="w-full px-5 mt-5 mb-4">
            <div className="flex justify-between items-center">
            {logStatus === 'true' ? 
              <div className="relative pl-5">
                <Link to="/profile">
                  <span>
                    <img src={userIcon} width={23} height={23} />
                  </span>
                </Link>
              </div>
              :
              <div className="relative pl-5">
                <Link to="/login-customer">
                  <span>
                    {t("login")}
                  </span>
                </Link>
              </div>
            }
              <div className="flex space-x-5 items-center">
                <div className="favorite relative">
                  <Link to="/wishlist">
                    <span>
                      <ThinLove />
                    </span>
                  </Link>
                  <span className="w-[18px] h-[18px] bg-qh2-green rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                    {favorite.length}
                  </span>
                </div>
              </div>
              <div className="relative pl-8">
                <div
                  onClick={() => setToggleLang(!toggleLang)}
                  className="cursor-pointer"
                >
                  <span className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                    <img src={language} width={25} height={25} />
                  </span>
                </div>
                <div
                  className={`${
                    toggleLang ? "block" : "hidden"
                  } absolute left-0 mt-2 w-36 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 transition-all duration-300`}
                >
                  <ul className="py-1">
                    <li
                      className={`${
                        lang === "ar"
                          ? "bg-gray-50 text-gray-600"
                          : "text-gray-700"
                      } block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 cursor-pointer`}
                      onClick={() => changeLanguage("ar")}
                    >
                      العربية
                    </li>
                    <li
                      className={`${
                        lang === "en"
                          ? "bg-gray-50 text-gray-600"
                          : "text-gray-700"
                      } block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 cursor-pointer`}
                      onClick={() => changeLanguage("en")}
                    >
                      English
                    </li>
                    <li
                      className={`${
                        lang === "he"
                          ? "bg-gray-50 text-gray-600"
                          : "text-gray-700"
                      } block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 cursor-pointer`}
                      onClick={() => changeLanguage("he")}
                    >
                      עִברִית
                    </li>
                  </ul>
                </div>
              </div>

              <button onClick={action} type="button">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.0363 33.9994C7.66923 34.031 0.0436412 26.4423 0.000545718 17.0452C-0.0425497 7.68436 7.54917 0.0479251 16.9447 0.00021656C26.3072 -0.0467224 33.9505 7.54277 33.9998 16.9352C34.0483 26.3153 26.4411 33.9679 17.0363 33.9994Z"
                    fill="black"
                  />
                  <path
                    d="M17.0363 33.9994C26.4411 33.9679 34.0483 26.3153 33.9998 16.9352C33.9505 7.54277 26.3072 -0.0467224 16.9447 0.00021656C7.54917 0.0479251 -0.0425497 7.68436 0.000545718 17.0452C0.0436412 26.4423 7.66846 34.031 17.0363 33.9994ZM23.4629 21.5945C23.4514 21.8445 23.3321 22.0908 23.1305 22.3039C22.7865 22.6671 22.4479 23.0342 22.1039 23.3966C21.5236 24.0084 21.1458 24.0068 20.5648 23.3889C19.4581 22.2124 18.3492 21.0389 17.2533 19.8523C17.0633 19.6461 16.9686 19.6169 16.7608 19.8431C15.6511 21.0512 14.5222 22.2424 13.3978 23.4366C12.8753 23.9914 12.4697 23.9891 11.9388 23.4312C11.6032 23.0788 11.2715 22.7218 10.9399 22.3647C10.4089 21.7938 10.4081 21.3575 10.9376 20.7927C12.0503 19.6046 13.1593 18.4126 14.2836 17.2361C14.4822 17.0283 14.5037 16.9152 14.2921 16.6943C13.1654 15.5193 12.058 14.3266 10.9452 13.1385C10.4004 12.556 10.4042 12.1259 10.9545 11.5387C11.2785 11.1925 11.6009 10.8447 11.9272 10.5007C12.4821 9.91666 12.8822 9.92358 13.4417 10.5192C14.5468 11.6965 15.6588 12.8677 16.7516 14.0573C16.9671 14.2912 17.071 14.2651 17.271 14.0473C18.3831 12.8415 19.5082 11.6472 20.6363 10.4561C21.1273 9.93743 21.5521 9.94359 22.0469 10.4576C22.3848 10.8085 22.7157 11.1655 23.0474 11.5226C23.6115 12.1289 23.6122 12.5552 23.052 13.1539C21.9477 14.3328 20.8503 15.517 19.7321 16.6828C19.5058 16.9183 19.5382 17.0391 19.7475 17.2584C20.8641 18.4249 21.9623 19.6092 23.0681 20.7865C23.2721 21.002 23.456 21.229 23.4629 21.5945Z"
                    fill="#FE4949"
                  />
                  <path
                    d="M23.4614 21.5947C23.4545 21.2292 23.2706 21.0022 23.0659 20.7844C21.9608 19.6071 20.8619 18.4228 19.7452 17.2563C19.5359 17.0377 19.5036 16.9169 19.7298 16.6807C20.848 15.5157 21.9454 14.3307 23.0497 13.1518C23.61 12.5539 23.6084 12.1276 23.0451 11.5205C22.7134 11.1635 22.3825 10.8064 22.0447 10.4555C21.5498 9.9415 21.125 9.93611 20.6341 10.454C19.5059 11.6452 18.3808 12.8394 17.2688 14.0452C17.0679 14.263 16.964 14.2891 16.7493 14.0552C15.6565 12.8663 14.5445 11.6952 13.4394 10.5171C12.88 9.92149 12.4798 9.91456 11.9249 10.4986C11.5979 10.8426 11.2762 11.1904 10.9522 11.5367C10.402 12.1238 10.3981 12.5547 10.943 13.1364C12.0558 14.3245 13.1632 15.5172 14.2898 16.6922C14.5014 16.9131 14.4799 17.0254 14.2813 17.234C13.157 18.4113 12.0481 19.6025 10.9353 20.7906C10.4058 21.3561 10.4074 21.7917 10.9376 22.3626C11.2693 22.7197 11.601 23.076 11.9365 23.4291C12.4675 23.987 12.873 23.9893 13.3956 23.4345C14.5207 22.2403 15.6488 21.0491 16.7586 19.841C16.9671 19.614 17.061 19.644 17.2511 19.8502C18.3469 21.0368 19.4559 22.2103 20.5625 23.3868C21.1435 24.0047 21.5214 24.0063 22.1016 23.3945C22.4456 23.0321 22.7842 22.6643 23.1282 22.3018C23.3306 22.091 23.4507 21.8448 23.4614 21.5947Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full mt-5 px-5">
            <div className="search-bar w-full h-[34px]  flex ">
              <div className="flex-1 bg-white h-full border border-r-0 border-[#E9E9E9]">
                <input
                  type="text"
                  className="w-full text-xs h-full focus:outline-none foucus:ring-0 placeholder:text-qgraytwo pl-2.5 "
                  placeholder="Search Product..."
                />
              </div>
              <div className="w-[40px] h-full bg-qh2-green flex justify-center items-center">
                <span>
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 8.83158C0.0484783 8.43809 0.0969566 8.04461 0.169674 7.67571C0.484783 5.92962 1.2362 4.42946 2.39968 3.12604C3.75707 1.60128 5.45381 0.592971 7.44142 0.199486C9.76838 -0.267779 11.9741 0.0765214 14.0345 1.33076C16.3614 2.75714 17.84 4.82294 18.3975 7.50356C18.8823 9.7907 18.5187 11.9795 17.4037 14.0453C17.1856 14.4388 17.1856 14.4388 17.5007 14.7585C19.1247 16.4062 20.7487 18.0539 22.3727 19.7016C22.906 20.2427 23.1242 20.8575 22.9302 21.5953C22.5667 22.9971 20.8457 23.5135 19.7549 22.3822C18.8338 21.4231 17.9127 20.5132 16.9674 19.5541C16.216 18.7917 15.4888 18.0539 14.7374 17.2915C14.6889 17.2423 14.6404 17.1932 14.6162 17.1686C14.0345 17.4637 13.5012 17.808 12.9195 18.0539C10.4228 19.1114 7.90196 19.0868 5.42957 17.9555C3.56316 17.0948 2.15728 15.7422 1.16348 13.9469C0.533261 12.791 0.145435 11.5614 0.0484783 10.2334C0.0484783 10.1596 0.0242392 10.0858 0 10.012C0 9.64314 0 9.22507 0 8.83158ZM3.00566 9.4464C3.00566 12.9632 5.84164 15.816 9.30784 15.816C12.774 15.7914 15.5615 12.9632 15.5858 9.4464C15.5858 5.95422 12.7498 3.07685 9.30784 3.07685C5.8174 3.07685 3.00566 5.92962 3.00566 9.4464Z"
                      fill="#1D1D1D"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full mt-5 px-5 flex items-center space-x-3">
            <span
              onClick={() => setTab("menu")}
              className={` mx-1 text-base font-semibold ${
                tab === "menu" ? "text-qblack" : "text-qgray "
              }`}
            >
              {t("menu")}
            </span>
            <span className="w-[1px] h-[14px] bg-qgray mx-1"></span>
            <span
              onClick={() => setTab("category")}
              className={`text-base font-semibold  ${
                tab === "category" ? "text-qblack" : "text-qgray"
              }`}
            >
              {t("Categories")}
            </span>
          </div>
          {tab === "category" ? (
            <div className="category-item mt-5 w-full">
              <ul className="categories-list">
                <li className="category-item">
                  {data.categories?.map((item, index) => (
                    <Link to={`/all-products/category/${item.id}`}>
                      <li className="category-item">
                        <a href="#">
                          <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center space-x-6">
                              <span>
                                <img
                                  src={item.image}
                                  alt="categories"
                                  width={20}
                                  className="ml-5"
                                />
                              </span>
                              <span className="text-xs font-400">
                                {lang === "ar"
                                  ? item.name_ar
                                  : lang === "en"
                                  ? item.name_en
                                  : item.name_he}
                              </span>
                            </div>
                            <div>
                              {/* <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-3 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 19.5 8.25 12l7.5-7.5"
                                  />
                                </svg>
                              </span> */}
                            </div>
                          </div>
                        </a>
                      </li>
                    </Link>
                  ))}
                </li>
              </ul>
            </div>
          ) : (
            <div className="menu-item mt-5 w-full">
              <ul className="categories-list">
                <li className="category-item">
                  <Link to={`/`}>
                    <li className="category-item">
                      <a href="#">
                        <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                          <div className="flex items-center space-x-6">
                            <span className="text-md font-400">
                              {t("Home Page")}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to={`/products`}>
                    <li className="category-item">
                      <a href="#">
                        <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                          <div className="flex items-center space-x-6">
                            <span className="text-md font-400">
                              {t("Our Products")}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to={`/all-categories`}>
                    <li className="category-item">
                      <a href="#">
                        <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                          <div className="flex items-center space-x-6">
                            <span className="text-md font-400">
                              {t("Categories")}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to={`/all-brands`}>
                    <li className="category-item">
                      <a href="#">
                        <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                          <div className="flex items-center space-x-6">
                            <span className="text-md font-400">
                              {t("brands")}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to={`/best-seller-products`}>
                    <li className="category-item">
                      <a href="#">
                        <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                          <div className="flex items-center space-x-6">
                            <span className="text-md font-400">
                              {t("Most popular sales")}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </Link>
                </li>
                <li className="category-item">
                  <Link to={`/latest-products`}>
                    <li className="category-item">
                      <a href="#">
                        <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                          <div className="flex items-center space-x-6">
                            <span className="text-md font-400">
                              {t("New Arrivals")}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </Link>
                </li>
              </ul>
              <div class="bg-white w-full h-auto py-8 flex items-center justify-center gap-2 flex-wrap">
                <div className="my-1">
                  <a
                    href={data2?.socials?.[1]?.url}
                    class="p-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 71 72"
                      fill="none"
                    >
                      <path
                        d="M46.4233 38.6403L47.7279 30.3588H39.6917V24.9759C39.6917 22.7114 40.8137 20.4987 44.4013 20.4987H48.1063V13.4465C45.9486 13.1028 43.7685 12.9168 41.5834 12.8901C34.9692 12.8901 30.651 16.8626 30.651 24.0442V30.3588H23.3193V38.6403H30.651V58.671H39.6917V38.6403H46.4233Z"
                        fill="#111827"
                      />
                    </svg>
                  </a>
                </div>
                <div className="my-1">
                  <a
                    href={data2?.socials?.[0]?.url}
                    class="p-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 71 72"
                      fill="none"
                    >
                      <path
                        d="M27.3762 35.7808C27.3762 31.1786 31.1083 27.4468 35.7132 27.4468C40.3182 27.4468 44.0522 31.1786 44.0522 35.7808C44.0522 40.383 40.3182 44.1148 35.7132 44.1148C31.1083 44.1148 27.3762 40.383 27.3762 35.7808ZM22.8683 35.7808C22.8683 42.8708 28.619 48.618 35.7132 48.618C42.8075 48.618 48.5581 42.8708 48.5581 35.7808C48.5581 28.6908 42.8075 22.9436 35.7132 22.9436C28.619 22.9436 22.8683 28.6908 22.8683 35.7808ZM46.0648 22.4346C46.0646 23.0279 46.2404 23.608 46.5701 24.1015C46.8997 24.595 47.3684 24.9797 47.9168 25.2069C48.4652 25.4342 49.0688 25.4939 49.6511 25.3784C50.2334 25.2628 50.7684 24.9773 51.1884 24.5579C51.6084 24.1385 51.8945 23.6041 52.0105 23.0222C52.1266 22.4403 52.0674 21.8371 51.8404 21.2888C51.6134 20.7406 51.2289 20.2719 50.7354 19.942C50.2418 19.6122 49.6615 19.436 49.0679 19.4358H49.0667C48.2708 19.4361 47.5077 19.7522 46.9449 20.3144C46.3821 20.8767 46.0655 21.6392 46.0648 22.4346ZM25.6072 56.1302C23.1683 56.0192 21.8427 55.6132 20.9618 55.2702C19.7939 54.8158 18.9606 54.2746 18.0845 53.4002C17.2083 52.5258 16.666 51.6938 16.2133 50.5266C15.8699 49.6466 15.4637 48.3214 15.3528 45.884C15.2316 43.2488 15.2073 42.4572 15.2073 35.781C15.2073 29.1048 15.2336 28.3154 15.3528 25.678C15.4639 23.2406 15.8731 21.918 16.2133 21.0354C16.668 19.8682 17.2095 19.0354 18.0845 18.1598C18.9594 17.2842 19.7919 16.7422 20.9618 16.2898C21.8423 15.9466 23.1683 15.5406 25.6072 15.4298C28.244 15.3086 29.036 15.2844 35.7132 15.2844C42.3904 15.2844 43.1833 15.3106 45.8223 15.4298C48.2612 15.5408 49.5846 15.9498 50.4677 16.2898C51.6356 16.7422 52.4689 17.2854 53.345 18.1598C54.2211 19.0342 54.7615 19.8682 55.2161 21.0354C55.5595 21.9154 55.9658 23.2406 56.0767 25.678C56.1979 28.3154 56.2221 29.1048 56.2221 35.781C56.2221 42.4572 56.1979 43.2466 56.0767 45.884C55.9656 48.3214 55.5573 49.6462 55.2161 50.5266C54.7615 51.6938 54.2199 52.5266 53.345 53.4002C52.4701 54.2738 51.6356 54.8158 50.4677 55.2702C49.5872 55.6134 48.2612 56.0194 45.8223 56.1302C43.1855 56.2514 42.3934 56.2756 35.7132 56.2756C29.033 56.2756 28.2432 56.2514 25.6072 56.1302ZM25.4001 10.9322C22.7371 11.0534 20.9174 11.4754 19.3282 12.0934C17.6824 12.7316 16.2892 13.5878 14.897 14.977C13.5047 16.3662 12.6502 17.7608 12.0116 19.4056C11.3933 20.9948 10.971 22.8124 10.8497 25.4738C10.7265 28.1394 10.6982 28.9916 10.6982 35.7808C10.6982 42.57 10.7265 43.4222 10.8497 46.0878C10.971 48.7494 11.3933 50.5668 12.0116 52.156C12.6502 53.7998 13.5049 55.196 14.897 56.5846C16.289 57.9732 17.6824 58.8282 19.3282 59.4682C20.9204 60.0862 22.7371 60.5082 25.4001 60.6294C28.0687 60.7506 28.92 60.7808 35.7132 60.7808C42.5065 60.7808 43.3592 60.7526 46.0264 60.6294C48.6896 60.5082 50.5081 60.0862 52.0983 59.4682C53.7431 58.8282 55.1373 57.9738 56.5295 56.5846C57.9218 55.1954 58.7745 53.7998 59.4149 52.156C60.0332 50.5668 60.4575 48.7492 60.5768 46.0878C60.698 43.4202 60.7262 42.57 60.7262 35.7808C60.7262 28.9916 60.698 28.1394 60.5768 25.4738C60.4555 22.8122 60.0332 20.9938 59.4149 19.4056C58.7745 17.7618 57.9196 16.3684 56.5295 14.977C55.1395 13.5856 53.7431 12.7316 52.1003 12.0934C50.5081 11.4754 48.6894 11.0514 46.0284 10.9322C43.3612 10.811 42.5085 10.7808 35.7152 10.7808C28.922 10.7808 28.0687 10.809 25.4001 10.9322Z"
                        fill="#111827"
                      />
                    </svg>
                  </a>
                </div>
                <div className="my-1">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${data2?.socials?.[2]?.url}`}
                    class="p-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 71 72"
                      fill="none"
                    >
                      <path
                        d="M12.5068 56.8405L15.7915 44.6381C13.1425 39.8847 12.3009 34.3378 13.4211 29.0154C14.5413 23.693 17.5482 18.952 21.89 15.6624C26.2319 12.3729 31.6173 10.7554 37.0583 11.1068C42.4992 11.4582 47.6306 13.755 51.5108 17.5756C55.3911 21.3962 57.7599 26.4844 58.1826 31.9065C58.6053 37.3286 57.0535 42.7208 53.812 47.0938C50.5705 51.4668 45.8568 54.5271 40.5357 55.7133C35.2146 56.8994 29.6432 56.1318 24.8438 53.5513L12.5068 56.8405ZM25.4386 48.985L26.2016 49.4365C29.6779 51.4918 33.7382 52.3423 37.7498 51.8555C41.7613 51.3687 45.4987 49.5719 48.3796 46.7452C51.2605 43.9185 53.123 40.2206 53.6769 36.2279C54.2308 32.2351 53.445 28.1717 51.4419 24.6709C49.4388 21.1701 46.331 18.4285 42.6027 16.8734C38.8745 15.3184 34.7352 15.0372 30.8299 16.0736C26.9247 17.11 23.4729 19.4059 21.0124 22.6035C18.5519 25.801 17.2209 29.7206 17.2269 33.7514C17.2237 37.0937 18.1503 40.3712 19.9038 43.2192L20.3823 44.0061L18.546 50.8167L25.4386 48.985Z"
                        fill="#111827"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M43.9566 36.8847C43.5093 36.5249 42.9856 36.2716 42.4254 36.1442C41.8651 36.0168 41.2831 36.0186 40.7236 36.1495C39.8831 36.4977 39.3399 37.8134 38.7968 38.4713C38.6823 38.629 38.514 38.7396 38.3235 38.7823C38.133 38.8251 37.9335 38.797 37.7623 38.7034C34.6849 37.5012 32.1055 35.2965 30.4429 32.4475C30.3011 32.2697 30.2339 32.044 30.2557 31.8178C30.2774 31.5916 30.3862 31.3827 30.5593 31.235C31.165 30.6368 31.6098 29.8959 31.8524 29.0809C31.9063 28.1818 31.6998 27.2863 31.2576 26.5011C30.9157 25.4002 30.265 24.42 29.3825 23.6762C28.9273 23.472 28.4225 23.4036 27.9292 23.4791C27.4359 23.5546 26.975 23.7709 26.6021 24.1019C25.9548 24.6589 25.4411 25.3537 25.0987 26.135C24.7562 26.9163 24.5939 27.7643 24.6236 28.6165C24.6256 29.0951 24.6864 29.5716 24.8046 30.0354C25.1049 31.1497 25.5667 32.2144 26.1754 33.1956C26.6145 33.9473 27.0937 34.6749 27.6108 35.3755C29.2914 37.6767 31.4038 39.6305 33.831 41.1284C35.049 41.8897 36.3507 42.5086 37.7105 42.973C39.1231 43.6117 40.6827 43.8568 42.2237 43.6824C43.1018 43.5499 43.9337 43.2041 44.6462 42.6755C45.3588 42.1469 45.9302 41.4518 46.3102 40.6512C46.5334 40.1675 46.6012 39.6269 46.5042 39.1033C46.2714 38.0327 44.836 37.4007 43.9566 36.8847Z"
                        fill="#111827"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
