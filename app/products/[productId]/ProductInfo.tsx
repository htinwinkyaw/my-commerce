"use client";

import React, { useState } from "react";

import Button from "@/app/_components/Button";
import { CartProductType } from "@prisma/client";
import { ExtendedProductType } from "@/types/product";
import NullData from "@/app/_components/NullData";
import { Rating } from "@mui/material";
import SetQuantity from "@/app/_components/SetQuantity";
import { calculateRating } from "@/app/_utils/calculateRating";
import useCart from "@/app/_hooks/useCart";

interface Props {
  product: ExtendedProductType | null | undefined;
}

const ProductDetailClient: React.FC<Props> = ({ product }) => {
  const { handleAddToCart } = useCart();

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product!.id,
    name: product!.name,
    price: product!.price,
    brand: product!.brand,
    description: product!.description,
    // image: product!.images[0],
    quantity: 1,
  });

  if (!product) {
    return <NullData title="Oops! Product is not found." />;
  }

  const rating = calculateRating(product);

  const Horizontal = () => {
    return <hr className="w-[30%] my-2" />;
  };

  const handleQtyIncrease = () => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity++ };
    });
  };

  const handleQtyDecrease = () => {
    if (cartProduct.quantity > 1) {
      setCartProduct((prev) => {
        return { ...prev, quantity: prev.quantity-- };
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>IMAGE WILL BE HERE</div>
      <div className="flex flex-col gap-1 text-sm text-slate-600">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={rating} readOnly />
          <div>({product.reviews.length} reviews)</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div className="flex items-center gap-4">
          <span className="font-semibold">CATEGORY: </span>
          {product.category.name}
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">BRAND: </span>
          {product.brand}
        </div>
        <div
          className={`font-semibold uppercase ${
            product.inStock ? "text-teal-500" : "text-rose-500"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        <SetQuantity
          cartCounter={false}
          cartProduct={cartProduct}
          handleQtyDecrease={handleQtyDecrease}
          handleQtyIncrease={handleQtyIncrease}
        />

        <Horizontal />
        <div className="max-w-[300px]">
          {product.inStock ? (
            <Button
              label="Add to Cart"
              onClick={() => {
                handleAddToCart(cartProduct);
              }}
              outline
            />
          ) : (
            <Button label="Add to Cart" disabled onClick={() => {}} outline />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
