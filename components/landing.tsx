import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "../redux/app/hookes";
import Header from "./header";

const Landing = () => {
  const isLoggedIn = useAppSelector((state) => state.profileSlice.isLoggedIn);
  return (
    <div className="bg-wraper">
      <Header />
      <div className="text-white flex justify-center items-end w-full h-full pb-10 sm:pb-32">
        <div className="text-center">
          <p className="text-2xl sm:text-4xl heheadline-1 ">
            Track films you’ve watched.
          </p>
          <p className=" text-2xl sm:text-4xl headline-1 ">
            Save those you want to see.
          </p>
          <p className="text-2xl sm:text-4xl headline-1 ">
            Tell your friends what’sgood.
          </p>

         {!isLoggedIn? <div className="mt-5">
            <Link href="/signup">
              <button className="btn py-2 px-6 uppercase">
                Get started — it‘s free!
              </button>
            </Link>
          </div>:null}
        </div>
      </div>
    </div>
  );
};

export default Landing;
