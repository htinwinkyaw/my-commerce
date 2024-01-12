import { CartProductType } from "@/types/product";
import React from "react";
import SetQuantity from "../_components/SetQuantity";
import { formatPrice } from "../_utils/formatPrice";
import useCart from "../_hooks/useCart";

interface Props {
  checkout: boolean;
  product: CartProductType;
}

const CartItem: React.FC<Props> = ({ checkout, product }) => {
  const {
    handleIncreaseQtyInCart,
    hanldeDecreaseQtyInCart,
    handleRemoveFromCart,
  } = useCart();

  return (
    <div className="grid grid-cols-5 items-center gap-4 py-4 text-xs md:text-sm border-t-[1.5px] border-slate-200">
      <div className="col-span-2 justify-self-start">{product.name}</div>
      <div className="justify-self-center">{formatPrice(product.price)}</div>
      <div className="justify-self-center">
        {checkout ? (
          product.quantity
        ) : (
          <SetQuantity
            cartCounter={true}
            cartProduct={product}
            handleQtyIncrease={handleIncreaseQtyInCart.bind(null, product)}
            handleQtyDecrease={hanldeDecreaseQtyInCart.bind(null, product)}
          />
        )}
      </div>
      <div className="justify-self-end">
        {formatPrice(product.price * product.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
