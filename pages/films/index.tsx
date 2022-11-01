import {  GetStaticProps } from "next";
import React from "react";
import { useDispatch } from "react-redux";
import FilmCards from "../../components/filmCard";
import Header from "../../components/header";
import { setCategory } from "../../redux/features/categorySlice";
import { prisma } from "../../lib/prisma";
import { AppProps } from "../../types";

const Films = ({categories}:AppProps) => {
  const dispatch = useDispatch();
  return (
    <div className="bgcolor min-h-screen">
      <Header />
      <div className="pt-40">
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
        <FilmCards />
      </div>
    </div>
  );
};

export const getStaticProps:GetStaticProps = async () => {
  const categories = await prisma.category.findMany();
  return {
    props: { categories },
    revalidate:604800
  };
};

export default Films;
