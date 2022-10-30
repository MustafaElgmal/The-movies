import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/features/categorySlice";
import { AppProps } from "../types";
import { getCategories } from "../utils/apis";

const Buttons = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  const updateCategories = async () => {
    await getCategories(setCategories);
  };
  useEffect(() => {
    updateCategories();
  }, []);
  return (
    <div className="bgcolor w-full">
      <div className="flex mx-auto  max-w-7xl  sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-20 ">
        <div>
          <h1 className="px-4 py-2 text-lg text-white">Filter By</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  gap-2 ">
          {categories?.map((category) => (
            <button
              key={category.id}
              className="rounded-full w-full   border border-transparent btn py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => dispatch(setCategory(category.name))}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
