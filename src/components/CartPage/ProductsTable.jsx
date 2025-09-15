import { useDispatch, useSelector } from "react-redux";
import InputQuantityCom from "../Helpers/InputQuantityCom";
import { addItem, decrementItem, removeItem } from "../../redux/cartSlice";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCartDrawer } from "../../context/CartDrawerContext";

export default function ProductsTable({ className }) {
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const handleRemoveCart = (index) => {
    dispatch(removeItem(index));
  };

  const handleDecrementItem = (index) => {
    dispatch(decrementItem(index));
  };

  const handleIncrementItem = (pro) => {
    dispatch(addItem({ newItem: pro }));
  };
  console.log(cart);
  return (
    <div className="space-y-4 py-2">
      {cart?.map((item, index) => (
        <div
          key={index}
          className="flex gap-4 p-3 bg-[#2a2a2a] rounded-lg border border-gray-700"
        >
          <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg border border-gray-600">
            <img
              src={
                item?.images?.[0]?.url ||
                "/assets/images/placeholder-product.png"
              }
              alt="product"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div className="text-white hover:text-secondary-color transition-colors">
                <h3 className="font-medium line-clamp-1">
                  {lang === "ar"
                    ? item.name_ar
                    : lang === "en"
                    ? item.name_en
                    : item.name_he}
                </h3>
              </div>

              <button
                onClick={() => handleRemoveCart(index)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-1 flex flex-wrap gap-2">
              {item.selectedColor && (
                <div className="flex items-center text-sm text-gray-300">
                  <span className="mr-1">{t("Color")}:</span>
                  <div
                    className="w-4 h-4 rounded-full border border-gray-500"
                    style={{
                      backgroundColor: item.product_colors.find(
                        (c) => c.id === item.selectedColor
                      )?.color,
                    }}
                  />
                </div>
              )}

              {item.selectedSize && (
                <div className="text-sm text-gray-300">
                  <span className="mr-1">{t("Size")}:</span>
                  <span>
                    {lang === "ar"
                      ? item.product_sizes?.find(
                          (size) => size.id === item?.selectedSize
                        ).size_ar
                      : item.product_sizes?.find(
                          (size) => size.id === item?.selectedSize
                        ).size_en}
                  </span>
                </div>
              )}
              {(item.selectedAddition || item.selectedAddition === 0) && (
                <div className="text-sm text-gray-300">
                  <span className="font-bold"> | </span>

                  {item.selectedAddition === 0 ? (
                    <>{t("no add-ons")}</>
                  ) : (
                    <>
                      <span className="mr-1">{t("add-ons")}:</span>
                      <span>
                        {item.selectedAddition?.length === 0
                          ? t("no add-ons")
                          : item.selectedAddition
                              .map((id) => {
                                const addition = item.additions?.find(
                                  (a) => a.id === id
                                );
                                return lang === "ar"
                                  ? addition?.name_ar
                                  : addition?.name_en;
                              })
                              .filter(Boolean)
                              .join(", ")}
                      </span>
                    </>
                  )}
                </div>
              )}
              {(item.selectedFlavor || item.selectedFlavor === 0) && (
                <div className="text-sm text-gray-300">
                  <span className="font-bold"> | </span>
                  {item.selectedFlavor === 0 ? (
                    <>{t("no flavor")}</>
                  ) : (
                    <>
                      <span className="mr-1">{t("flavor")}:</span>
                      <span>
                        {item.selectedFlavor?.length === 0
                          ? t("no flavor")
                          : item.selectedFlavor
                              .map((id) => {
                                const flavor = item.flavors?.find(
                                  (f) => f.id === id
                                );
                                return lang === "ar"
                                  ? flavor?.name_ar
                                  : flavor?.name_en;
                              })
                              .filter(Boolean)
                              .join(", ")}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-secondary-color font-bold">
                {item.price} {t("JD")}
              </div>

              <InputQuantityCom
                onDecrement={() => handleDecrementItem(index)}
                quantity={item.quantity}
                onIncrement={() => handleIncrementItem(item)}
                className="bg-[#1a1a1a] border-gray-700"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
