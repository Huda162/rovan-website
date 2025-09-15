import { Link } from "react-router-dom";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import logo from "../../../../../public/assets/images/logo.png";
import { useSelector } from "react-redux";
import { useCartDrawer } from "../../../../context/CartDrawerContext";
import i18n from "i18next";
import language from "../../../../../public/assets/images/language.svg";
import { useTheme } from "@material-tailwind/react";
import { useState } from "react";

export default function HeaderTwo({ className, drawerAction }) {
  const cart = useSelector((state) => state.cart.value);
  const { toggleCartDrawer, openCartDrawer, closeCartDrawer } = useCartDrawer();
  const lang = localStorage.getItem("i18nextLng");
  const [toggleLang, setToggleLang] = useState(false);
  const theme = useTheme();

  document.body.dir = i18n.dir();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
    const language = localStorage.setItem("language", lng);
    setToggleLang(false);
  };
  return (
    <header
      className={` ${
        className || ""
      } header-section-wrapper absolute top-0 w-full xl:relative z-30`}
    >
      {/* <TopBar className="quomodo-shop-top-bar" /> */}
      <Middlebar className="quomodo-shop-middle-bar lg:hidden hidden xl:block " />
      <div className="quomodo-shop-drawer lg:block xl:hidden  block w-full h-[80px] bg-[#13171a] fixed z-999 xl:z-0">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div>
            <Link to="/">
              <img width="80" height="36" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-white">
            <div className="relative pl-5">
              <div
                onClick={() => setToggleLang(!toggleLang)}
                className="cursor-pointer"
              >
                <span className="flex items-center space-x-1 text-white hover:text-secondary-color transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
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
                </ul>
              </div>
            </div>
            <div className="cart relative cursor-pointer">
              <button
                onClick={() => {
                  toggleCartDrawer();
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </span>
              </button>
              <span className="w-[18px] h-[18px] rounded-full bg-secondary-color absolute -top-2 -right-2.5 flex justify-center items-center text-[10px] taxt-main-color">
                {cart?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
