import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../public/assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/cartSlice";
import { useCartDrawer } from "../../../context/CartDrawerContext";
import { select, Typography } from "@material-tailwind/react";
import AddOnCard from "../../HomeTwo/AddOnsCard";
import no from "../../../../public/assets/images/no.png";

function ProductCardStyleThree({ datas }) {
  const dispatch = useDispatch();
  const { openCartDrawer } = useCartDrawer();
  const lang = localStorage.getItem("i18nextLng") || "en";
  const images = datas?.images ?? [];
  const { t } = useTranslation();

  // State management
  const [openDetails, setOpenDetails] = useState(false);
  const [openSizeModal, setOpenSizeModal] = useState(false);
  const [quantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedAddition, setSelectedAddition] = useState([]);
  const [selectedFlavor, setSelectedFlavor] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(datas.price_jod || 0);
  const [sizePrice, setSizePrice] = useState(datas.price_jod || 0);
  const [additionPrice, setAdditionPrice] = useState(0);
  const [flavorPrice, setFlavorPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Text translations
  const getTextByLang = (ar, en, he) => {
    if (lang === "ar") return ar;
    if (lang === "he") return he;
    return en;
  };

  const name = getTextByLang(datas.name_ar, datas.name_en, datas.name_he);
  const description = getTextByLang(
    datas.description_ar,
    datas.description_en,
    datas.description_he
  );

  useEffect(() => {
    if (openDetails || openSizeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openDetails, openSizeModal]);

  const handleAddToCart = () => {
    setLoading(true);

    const productToAdd = {
      ...datas,
      quantity,
      price: selectedPrice,
      selectedSize: datas.product_sizes?.length ? selectedSize : undefined,
      selectedFlavor: datas.flavors?.length ? selectedFlavor : undefined,
      selectedAddition: datas.additions?.length ? selectedAddition : undefined,
    };

    dispatch(addItem({ newItem: productToAdd }));

    setTimeout(() => {
      setLoading(false);
      openCartDrawer();
      setOpenDetails(false);
      setOpenSizeModal(false);
      setSelectedSize("");
      setSelectedAddition("");
      setSelectedFlavor("");
      setSelectedPrice(datas.price_jod || 0);
    }, 300);
  };

  const handleMainAddToCart = () => {
    if (
      datas.product_sizes?.length > 0 ||
      datas.additions?.length > 0 ||
      datas.flavors?.length > 0
    ) {
      setOpenDetails(true);
    } else {
      handleAddToCart();
    }
  };

  const handleSizeSelect = (sizeId, price) => {
    setSelectedSize(sizeId);
    setSizePrice(price);
  };

  const handleAdditionSelect = (addId, price) => {
    if (addId === 0) {
      setSelectedAddition([0]);
      setAdditionPrice(0);
    } else {
      let updated = [...selectedAddition];

      if (updated.includes(0)) {
        updated = [];
      }

      if (updated.includes(addId)) {
        updated = updated.filter((id) => id !== addId);
      } else {
        updated.push(addId);
      }

      setSelectedAddition(updated);

      const total = updated
        .map((id) =>
          id === 0
            ? 0
            : datas.additions.find((item) => item.id === id)?.price_jod || 0
        )
        .reduce((sum, price) => sum + Number(price), 0);

      setAdditionPrice(total);
    }
  };

  const handleFlavorSelect = (flavorId, price) => {
    if (flavorId === 0) {
      setSelectedFlavor([0]);
      setFlavorPrice(0);
    } else {
      let updated = [...selectedFlavor];

      if (updated.includes(0)) {
        updated = [];
      }

      if (updated.includes(flavorId)) {
        updated = updated.filter((id) => id !== flavorId);
      } else {
        updated.push(flavorId);
      }

      setSelectedFlavor(updated);

      const total = updated
        .map((id) =>
          id === 0
            ? 0
            : datas.flavors.find((item) => item.id === id)?.price_jod || 0
        )
        .reduce((sum, price) => sum + Number(price), 0);

      setFlavorPrice(total);
    }
  };

  useEffect(() => {
    setSelectedPrice(
      Number(sizePrice) + Number(flavorPrice) + Number(additionPrice)
    );
    console.log(
      Number(sizePrice) + Number(flavorPrice) + Number(additionPrice)
    );
  }, [sizePrice, flavorPrice, additionPrice]);

  // Price display
  const getPriceDisplay = () => {
    if (!datas.product_sizes?.length) return `${datas.price_jod} ${t("JD")}`;

    const prices = datas.product_sizes.map((size) => size.size_price_jod);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return `${min} - ${max} ${t("JD")}`;
  };
  const isValidAddition = () => {
    if (!datas.additions?.length) return true;
    return selectedAddition.length > 0;
  };

  const isValidFlavor = () => {
    if (!datas.flavors?.length) return true;
    return selectedFlavor.length > 0;
  };

  const isValidSize = () => {
    if (!datas.product_sizes?.length) return true;
    return !!selectedSize;
  };

  const canAddToCart = () =>
    isValidSize() && isValidAddition() && isValidFlavor();

  return (
    <div className="relative w-full flex flex-col items-center pt-16 group">
      {/* Floating Image Container */}
      <div className="absolute top-0 z-10 transition-transform duration-300 group-hover:scale-105">
        <div className="w-28 h-28 bg-gradient-to-br from-secondary-color to-secondary-color/80 rounded-full p-1 shadow-xl">
          <div className="w-full h-full bg-[#1a1a1a] rounded-full overflow-hidden flex items-center justify-center p-1">
            <img
              src={images[0]?.url || logo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logo;
              }}
              alt={name}
              className="object-cover w-full h-full rounded-full border-2 border-secondary-color transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-xl shadow-lg p-4 pt-14 w-full border border-gray-700 relative overflow-hidden transition-all duration-300 group-hover:border-secondary-color/30">
        <div className="w-full text-center space-y-3">
          <div
            className="block cursor-pointer"
            onClick={() => setOpenDetails(true)}
          >
            <h3 className="text-white font-bold text-lg mb-1 hover:text-secondary-color transition-colors duration-200">
              {name}
            </h3>
            <p className="text-sm text-gray-300 min-h-[40px] line-clamp-2">
              {description}
            </p>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <div className="relative">
                  <span className="w-full bg-gradient-to-r from-secondary-color to-secondary-color/90 text-[#1a1a1a] font-bold text-[17px] px-2 py-2 rounded-lg inline-block shadow-md relative overflow-hidden">
                    <span className="relative z-10">{getPriceDisplay()}</span>
                    <div className="absolute top-0 left-0 w-4 h-full bg-white opacity-20 -skew-x-12 animate-shine"></div>
                  </span>
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => setOpenDetails(true)}
                className="flex items-center justify-center w-10 h-[41.5px] -mt-[7px] rounded-lg bg-[#3a3a3a] hover:bg-secondary-color/20 border border-gray-600 hover:border-secondary-color/40 transition-all duration-200"
                aria-label="View details"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300 hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleMainAddToCart}
              className="w-full group relative overflow-hidden rounded-lg px-4 py-2.5 font-bold text-white shadow-lg transition-all duration-300 ease-out hover:shadow-xl bg-[#3a3a3a]/90 hover:bg-[#3a3a3a]/70"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-secondary-color/10 to-[#fae4c4]/10 opacity-60"></span>
              <span className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-secondary-color to-[#fae4c4] opacity-40 transition-all duration-700 group-hover:translate-x-0"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {t("Add to cart")}
              </span>
              <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-secondary-color/30 to-[#fae4c4]/30 transition-all duration-500 group-hover:from-secondary-color group-hover:to-[#fae4c4] group-hover:h-1.5"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {openDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-[#2a2a2a] rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Header */}
            <div className="bg-[#1a1a1a] px-6 py-4 border-b border-gray-700 rounded-t-xl">
              <h3 className="text-white font-bold text-xl">{name}</h3>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex flex-col gap-6">
                {/* Square Image */}
                <div className="w-full h-64 overflow-hidden rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                  <img
                    src={images[0]?.url || logo}
                    alt={name}
                    className="w-full h-full aspect-square object-cover"
                  />
                </div>

                <div className="w-full">
                  <Typography className="text-gray-300 mb-4">
                    {description}
                  </Typography>

                  {datas.product_sizes?.length > 0 ? (
                    <div className="mt-4">
                      <h4 className="text-white text-lg font-semibold mb-3">
                        {t("Available Sizes")}
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {datas.product_sizes.map((size, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleSizeSelect(size.id, size.size_price_jod)
                            }
                            className={`py-2 px-3 rounded-lg border transition-colors ${
                              selectedSize === size.id
                                ? "border-secondary-color bg-secondary-color/10 text-white"
                                : "border-gray-600 text-gray-300 hover:border-secondary-color/50"
                            }`}
                          >
                            <div className="font-medium">
                              {lang === "ar"
                                ? size.size_ar
                                : lang === "he"
                                ? size.size_he
                                : size.size_en}
                            </div>
                            <div className="text-sm">
                              {size.size_price_jod} {t("JD")}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-secondary-color text-xl font-bold mt-4">
                      {datas.price_jod} {t("JD")}
                    </div>
                  )}
                  {datas?.additions?.length > 0 && (
                    <>
                      <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-b border-gray-300"></div>
                        <span className="px-4 text-md font-semibold text-gray-300 uppercase tracking-wide whitespace-nowrap">
                          {t("add-ons")}
                        </span>
                        <div className="flex-grow border-t border-b border-gray-300"></div>
                      </div>
                      <div className="flex items-center justify-center w-full">
                        <div className="xl:w-[80vw] grid grid-cols-6 gap-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6 gap-y-2 sm:gap-5 xl:gap-[30px] px-0">
                          <AddOnCard
                            item={{
                              id: 0,
                              name_ar: "بدون إضافات",
                              name_en: "Without Add-Ons",
                              name_he: "",
                              price_nis: "0",
                              price_jod: "0",
                              price_usd: "0",
                              image: no,
                            }}
                            isSelected={selectedAddition.includes(0)}
                            onclick={() => handleAdditionSelect(0, "0")}
                            className="text-white"
                          />
                          {datas?.additions?.map((item) => (
                            <div data-aos="fade-up" key={item.id}>
                              <AddOnCard
                                item={item}
                                isSelected={selectedAddition.includes(item.id)}
                                onclick={() =>
                                  handleAdditionSelect(item.id, item.price_jod)
                                }
                                className="text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  {datas?.flavors?.length > 0 && (
                    <>
                      <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-b border-gray-300"></div>
                        <span className="px-4 text-md font-semibold text-gray-300 uppercase tracking-wide whitespace-nowrap">
                          {t("flavors")}
                        </span>
                        <div className="flex-grow border-t border-b border-gray-300"></div>
                      </div>
                      <div className="flex items-center justify-center w-full">
                        <div className="xl:w-[80vw] grid grid-cols-6 gap-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6 gap-y-2 sm:gap-5 xl:gap-[30px] px-0">
                          <AddOnCard
                            item={{
                              id: 0,
                              name_ar: "بدون نكهات",
                              name_en: "Without Flavors",
                              name_he: "",
                              price_nis: "0",
                              price_jod: "0",
                              price_usd: "0",
                              image: no,
                            }}
                            isSelected={selectedFlavor.includes(0)}
                            onclick={() => handleFlavorSelect(0, "0")}
                            className="text-white"
                          />

                          {datas?.flavors?.map((item) => (
                            <div data-aos="fade-up" key={item.id}>
                              <AddOnCard
                                item={item}
                                isSelected={selectedFlavor.includes(item.id)}
                                onclick={() =>
                                  handleFlavorSelect(item.id, item.price_jod)
                                }
                                className="text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#1a1a1a] px-6 py-4 border-t border-gray-700 rounded-b-xl flex justify-between">
              <button
                onClick={() => setOpenDetails(false)}
                className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                {t("Close")}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart() || loading}
                className={`px-4 py-2 rounded-lg bg-secondary-color text-white font-medium hover:bg-secondary-color/90 transition-colors ${
                  !canAddToCart() || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } ${loading ? "cursor-wait" : ""}`}
              >
                {loading ? t("Adding...") : t("Add to cart")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCardStyleThree;
