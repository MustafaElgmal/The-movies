import React from "react";
import { AppProps } from "../types";
import UserSwiper from "./userSwiper";

const RecomendedUser = ({members}:AppProps) => {
  return (
    <div>
      <div className=" bgco h-[400px]  pl-5 justify-center items-center xl:flex hidden">
        <UserSwiper slidesPerView={4} members={members} />
      </div>
      <div className=" bgco h-[400px] pl-5  justify-center items-center xl:hidden lg:flex hidden">
        <UserSwiper slidesPerView={3} members={members} />
      </div>
      <div className=" bgco h-[400px] justify-center items-center xl:hidden lg:hidden sm:flex hidden ">
        <UserSwiper slidesPerView={2} members={members} />
      </div>
      <div className=" bgco h-[400px] justify-center items-center xl:hidden lg:hidden sm:hidden flex ">
        <UserSwiper slidesPerView={1}  members={members}/>
      </div>
    </div>
  );
};

export default RecomendedUser;
