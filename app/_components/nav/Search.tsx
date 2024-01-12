"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import React from "react";
import queryString from "query-string";
import { useRouter } from "next/navigation";

const Search = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { searchTerm: "" },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data) router.push("/");

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: { searchTerm: data.searchTerm },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
    router.refresh();
  };

  return (
    <div>
      <input
        type="text"
        id="searchTerm"
        placeholder="Explore my commerce..."
        autoComplete="off"
        {...register("searchTerm")}
        className="p-2 w-80 border border-gray-300 focus:border-[0.5px] rounded-l-md"
      />
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="p-2 text-white bg-slate-700 rounded-r-md border focus:border-[0.5px] hover:opacity-70"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
