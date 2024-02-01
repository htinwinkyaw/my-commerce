"use client";

import { Category } from "@prisma/client";
import CategoryNavItem from "./CategoryNavItem";
import Container from "../ui/Container";
import { useSearchParams } from "next/navigation";

interface Props {
  categories: Category[];
}
const CategoryNavList: React.FC<Props> = ({ categories }) => {
  const params = useSearchParams();
  const categoryParam = params.get("category");

  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flex-row no-wrap items-center justify-between overflow-x-auto">
          {categories.map((category, i) => {
            return (
              <CategoryNavItem
                key={i}
                label={category.name}
                selected={
                  categoryParam === category.name ||
                  (categoryParam === null && category.name === "All")
                }
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default CategoryNavList;
