"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartProductType } from "@/types/products";
import toast from "react-hot-toast";

type CartContextType = {
  cartProducts: CartProductType[] | null;
  totalQuantity: number;
  totalAmount: number;
  handleAddToCart: (cartProduct: CartProductType) => void;
  handleRemoveFromCart: (product: CartProductType) => void;
  handleIncreaseQtyInCart: (product: CartProductType) => void;
  hanldeDecreaseQtyInCart: (product: CartProductType) => void;
  handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // get the cart
  useEffect(() => {
    const savedCartItems: any = localStorage.getItem("mycommerce-cart");
    const cartItems: CartProductType[] | null = JSON.parse(savedCartItems);
    setCartProducts(cartItems);
  }, []);

  // calculate total amount and total quantity of products in cart
  useEffect(() => {
    if (cartProducts) {
      cartProducts.reduce(
        (acc, item) => {
          const amount = item.price * item.quantity;
          acc.totalAmount += amount;
          acc.totalQuantity += item.quantity;

          setTotalAmount(acc.totalAmount);
          setTotalQuantity(acc.totalQuantity);

          return acc;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );
    }
  }, [cartProducts]);

  const handleAddToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart: CartProductType[];
      if (prev) {
        const existingCartProductIndex = prev.findIndex((item) => {
          return item.id === product.id;
        });

        if (existingCartProductIndex === -1) {
          updatedCart = [...prev, product];
        } else {
          const existingCartProduct = prev[existingCartProductIndex];
          const updatedCartProduct = {
            ...existingCartProduct,
            quantity: existingCartProduct.quantity + product.quantity,
          };
          updatedCart = [...prev];
          updatedCart[existingCartProductIndex] = updatedCartProduct;
        }
      } else {
        updatedCart = [product];
      }

      localStorage.setItem("mycommerce-cart", JSON.stringify(updatedCart));
      toast.success("Added to cart.");

      return updatedCart;
    });
  }, []);

  const handleRemoveFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const updatedCart = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(updatedCart);
        localStorage.setItem("mycommerce-cart", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleIncreaseQtyInCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const productIndex = cartProducts.findIndex((item) => {
          return item.id === product.id;
        });

        const updatedCart = [...cartProducts];

        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: ++updatedCart[productIndex].quantity,
        };

        setCartProducts(updatedCart);
        localStorage.setItem("mycommerce-cart", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const hanldeDecreaseQtyInCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const productIndex = cartProducts.findIndex((item) => {
          return item.id === product.id;
        });

        const updatedCart = [...cartProducts];

        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: --updatedCart[productIndex].quantity,
        };

        setCartProducts(updatedCart);
        localStorage.setItem("mycommerce-cart", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setTotalAmount(0);
    setTotalQuantity(0);
    localStorage.removeItem("mycommerce-cart");
    toast.success("Cart is cleared.");
  }, []);

  const value = {
    cartProducts,
    totalAmount,
    totalQuantity,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQtyInCart,
    hanldeDecreaseQtyInCart,
    handleClearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("Accessing error at useCart.");
  }

  return context;
};

export default useCart;
