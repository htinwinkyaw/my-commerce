export const formatPrice: (price: number) => string = (price) => {
  const formattedPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MMK",
  }).format(price);
  return formattedPrice;
};
