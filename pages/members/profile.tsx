/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { classNames, films } from "../../constants";
import { StarIcon } from "@heroicons/react/20/solid";
import Header from "../../components/header";
import { addPhoto } from "../../utils/apis";
import { useDispatch } from "react-redux";
import {
  createBrowserSupabaseClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useAppSelector } from "../../redux/app/hookes";
import { calcRate } from "../../utils/functions";

const Profile = () => {
  const user = useAppSelector((state) => state.profileSlice.profile);
  const dispatch = useDispatch();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <div className="bgcolor min-h-screen">
      <Header />
      <div className="sm:flex sm:justify-between  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex  space-x-10">
          <div>
            <img
              src={`${
                user?.imageUrl
                  ? user.imageUrl
                  : "https://gdbgnlodeaeojoowuqoc.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjczODk5NiwiZXhwIjoxOTgyMDk4OTk2fQ.m8DMrMAaUazk13SE5o18af1ECIG400iofEsZ_M3_Jvk"
              }`}
              alt="Profile"
              className="h-40 w-40   rounded-full bg-gray-100"
            />

            <div className="pt-5">
              <div>
                <div className="flex justify-center items-center w-full">
                  <label
                    htmlFor="pic"
                    className=" flex flex-col justify-center items-center  bg-gray-50 rounded-3xl border-1 border-gray-300 border-solid cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <span className=" px-4 py-2 text-sm  text-gray-700 dark:text-gray-400">
                      Upload Photo
                    </span>

                    <input
                      className="hidden"
                      id="pic"
                      type="file"
                      accept=".jpg,.png"
                      onChange={async (e) => {
                        if (e.target.files !== null) {
                          await addPhoto(
                            user?.id!,
                            dispatch,
                            supabaseClient,
                            e.target.files[0]
                          );
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">{user?.fullName}</h1>
          </div>
        </div>
        <div className=" pt-20 sm:pt-0 flex py-10 sm:py-20 space-x-6">
          <div className="border-r px-5 ">
            <span className="flex justify-center text-gray-500 font-extrabold text-xl">
              {user.followings}
            </span>
            <h1 className="text-gray-700">Following</h1>
          </div>
          <div>
            <span className="flex justify-center text-gray-500 font-extrabold text-xl">
              {user.followers?.length}
            </span>
            <h1 className="text-gray-700">Followers</h1>
          </div>
        </div>
      </div>
      {user.favoriteFilms.length > 0 ? (
        <div className="mx-auto px-6   max-w-7xl   sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
          <h3 className="text-gray-500 pb-3">FAVORITE FILMS</h3>
          <div className="-mx-px grid grid-cols-2  sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {user.favoriteFilms.map((film) => (
              <Link key={film.id} href={`/films/${film.film.id}`}>
                <div className="group relative  p-4 sm:p-6 cursor-pointer">
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${film.film.profilePath}`}
                      alt="Photo"
                      className="h-full w-[780px]"
                    />
                  </div>
                  <div className="pt-10 pb-4 text-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a className="hover:text-white">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {film.film.name}
                      </a>
                    </h3>
                    <div className="mt-3 flex flex-col items-center">
                      <p className="sr-only">
                        {calcRate(film.film.rates)} out of 5 stars
                      </p>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              calcRate(film.film.rates) > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "flex-shrink-0 h-5 w-5"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {film.film.raviews.length} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const getServerSideProps = withPageAuth({ redirectTo: "/signin" });

export default Profile;
