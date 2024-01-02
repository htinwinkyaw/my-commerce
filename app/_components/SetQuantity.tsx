import { CartProductType } from "@/types/products";
import React from "react";

interface Props {
  cartCounter: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const SetQuantity: React.FC<Props> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  const btnStyles =
    "border border-slate-300 px-2 rounded disabled:cursor-not-allowed";
  return (
    <div className="flex flex-row items-center gap-8">
      {!cartCounter && <div className="font-semibold">QUANTITY: </div>}
      <div className="flex items-center gap-4 text-base">
        <button
          onClick={handleQtyDecrease}
          className={btnStyles}
          disabled={cartProduct.quantity === 1}
        >
          -
        </button>
        <span className={cartCounter ? "font-normal" : "font-semibold"}>
          {cartProduct.quantity}
        </span>
        <button onClick={handleQtyIncrease} className={btnStyles}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
