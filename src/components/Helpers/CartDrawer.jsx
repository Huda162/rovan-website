import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductsTable from "../CartPage/ProductsTable";

export function CartDrawer() {
  const { isCartOpen, openCartDrawer, closeCartDrawer } = useCartDrawer();
  const { t } = useTranslation();
  const carts = useSelector((state) => state.cart.value);
  const [width, setWidth] = useState();

  window.addEventListener("resize", function (event) {
    setWidth(window.innerWidth);
  });

  return (
    <Drawer
      open={isCartOpen}
      className="p-0 z-50 flex flex-col h-full bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] border-l border-gray-700 shadow-xl"
      size={450}
      transition={{ type: "tween", duration: 0.3 }}
      overlayProps={{
        onClick: (e) => {
          // Only close if clicking directly on overlay, not bubbled events
          if (e.target === e.currentTarget) {
            closeCartDrawer();
          }
        },
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 bg-[#1a1a1a] border-b border-gray-700 flex items-center justify-between">
        <Typography variant="h3" className="text-white font-bold">
          {t("Your Cart")} ({carts?.length})
        </Typography>
        <IconButton
          variant="text"
          className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
          onClick={closeCartDrawer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      {/* Products List - Added onClick to stop propagation */}
      <div
        className="flex-grow overflow-y-auto px-4 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        {carts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="bg-[#2a2a2a] p-6 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <Typography variant="h5" className="text-white mb-2">
              {t("Your cart is empty")}
            </Typography>
            <Typography className="text-gray-400 mb-6">
              {t("Start adding items to continue shopping")}
            </Typography>
            <Button
              onClick={closeCartDrawer}
              className="bg-secondary-color hover:bg-secondary-color/90 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              {t("Continue Shopping")}
            </Button>
          </div>
        ) : (
          <ProductsTable />
        )}
      </div>

      {/* Footer - Added onClick to stop propagation */}
      {carts?.length > 0 && (
        <div
          className="bg-[#1a1a1a] border-t border-gray-700 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <Typography className="text-gray-300 text-lg">
              {t("Total")}
            </Typography>
            <Typography className="text-white font-bold text-xl gap-1">
              {carts?.reduce(
                (acc, item) =>
                  acc + Number(item.price) * Number(item.quantity),
                0
              )} 
              {t("JD")}
            </Typography>
          </div>
          <Button
            fullWidth
            onClick={closeCartDrawer}
            className="bg-gradient-to-r from-secondary-color to-secondary-color/90 hover:from-secondary-color/90 hover:to-secondary-color text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            {t("Continue Shopping")}
          </Button>
        </div>
      )}
    </Drawer>
  );
}
