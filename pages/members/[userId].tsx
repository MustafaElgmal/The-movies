/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { classNames, films } from "../../constants";
import { StarIcon } from "@heroicons/react/20/solid";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "../../lib/prisma";
import { AppProps } from "../../types";
import Header from "../../components/header";
import { addPhoto } from "../../utils/apis";
import { useDispatch } from "react-redux";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const Profile = ({ user }: AppProps) => {
  const router=useRouter()
  const {id}=router.query
  console.log(id)
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

            <div>
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
            <button className="mt-5 px-5 py-2 bg-gray-500 text-gray-300 uppercase hover:bg-gray-400 hover:text-white">
              Follow
            </button>
          </div>
        </div>
        <div className=" pt-20 sm:pt-0 flex py-10 sm:py-20 space-x-6">
          <div className="border-r px-5 ">
            <span className="flex justify-center text-gray-500 font-extrabold text-xl">
              20
            </span>
            <h1 className="text-gray-700">Following</h1>
          </div>
          <div>
            <span className="flex justify-center text-gray-500 font-extrabold text-xl">
              2
            </span>
            <h1 className="text-gray-700">Followers</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto px-6   max-w-7xl   sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
        <h3 className="text-gray-500 pb-3">FAVORITE FILMS</h3>
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {films.map((film) => (
            <Link key={film.id} href={`/films/${film.id}`}>
              <div className="group relative border-r border-b border-gray-200 p-4 sm:p-6 cursor-pointer">
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img
                    src={film.imageSrc}
                    alt={film.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="pt-10 pb-4 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a className="hover:text-white">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {film.name}
                    </a>
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{film.rating} out of 5 stars</p>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            film.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "flex-shrink-0 h-5 w-5"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {film.reviewCount} reviews
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany();
  const paths = users.map((user) => {
    return {
      params: {
        userId: user.id,
      },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findFirst({
    where: { id: params?.userId as string },
    include: { favoriteFilms: true },
  });
  return { props: { user }, revalidate: 1 };
};

export default Profile;
