import { useState } from "react";

export default function InputQuantityCom({
  onDecrement,
  onIncrement,
  quantity,
}) {
  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border rounded-lg">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={onDecrement}
          type="button"
          className="text-[18px] text-qgray"
        >
          -
        </button>
        <span className="text-secondary-color">{quantity}</span>
        <button
          onClick={onIncrement}
          type="button"
          className="text-[18px] text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
