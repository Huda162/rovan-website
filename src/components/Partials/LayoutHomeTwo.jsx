import { useState } from "react";
import DiscountBanner from "../HomeTwo/DiscountBanner";
import Drawer from "../Mobile/Drawer";
import Footer from "./Footers/FooterTwo";
import HeaderTwo from "./Headers/HeaderTwo";
import Cart from "../Cart";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ThinBag from "../Helpers/icons/ThinBag";
import { CartDrawer } from "../Helpers/CartDrawer";
import { useCartDrawer } from "../../context/CartDrawerContext";
import useFetchData from "../../hooks/fetchData";
import { useTranslation } from "react-i18next";

export default function LayoutHomeTwo({ children, childrenClasses }) {
  const [drawer, setDrawer] = useState(false);
  const { i18n } = useTranslation();
  return (
    <>
      <>
        <div
          className={`w-full overflow-x-hidden transition duration-300 ${
            i18n.language === "en" ? "font-poppins" : "font-almarai"
          }`}
        >
          <div className={`xl:block col-span-12 hidden`}>
            <HeaderTwo drawerAction={() => setDrawer(!drawer)} />
            <CartDrawer />

            <div
              className={`w-[100vw]  ${childrenClasses || ""}`}
              style={{ marginTop: "10vh" }}
            >
              {children && children}
            </div>
            <Footer />
          </div>
          <div className="xl:hidden">
            <CartDrawer />
            <HeaderTwo
              drawerAction={() => setDrawer(!drawer)}
              className="xl:hidden "
            />
            <div
              className={`w-[100vw] xl:hidden   ${childrenClasses || ""}`}
              style={{ marginTop: "6rem" }}
            >
              {children && children}
            </div>
            <Footer />
          </div>
          {/* <Footer className="xl:hidden" /> */}
        </div>
      </>
    </>
  );
}
