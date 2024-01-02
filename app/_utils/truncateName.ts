export const truncateName = (name: string) => {
  if (name.length > 25) {
    return name.substring(0, 25) + "...";
  }
  return name;
};
