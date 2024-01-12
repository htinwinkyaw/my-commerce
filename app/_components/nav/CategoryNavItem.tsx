"use client";

import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { IconType } from "react-icons";
import queryString from "query-string";

interface Props {
  label: string;
  icon?: IconType;
  selected?: boolean;
}

const CategoryNavItem: React.FC<Props> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        { url: "/", query: updatedQuery },
        { skipNull: true }
      );

      router.push(url);
    }
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-row items-center justify-center gap-1 
    text-center p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
    ${
      selected
        ? "text-slate-800 border-b-slate-800"
        : "border-transparent text-slate-500"
    }`}
    >
      {Icon && <Icon size={20} />}
      <div>{label}</div>
    </div>
  );
};

export default CategoryNavItem;
