/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Header1 from "../../components/header1";
import { classNames, films } from "../../constants";
import { StarIcon } from "@heroicons/react/20/solid";

const Profile = () => {
  return (
    <div className="bgcolor min-h-screen">
      <Header1 />
      <div className="flex justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex py-10 space-x-10">
          <div>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="profile"
              className="h-40 w-40 rounded-full bg-gray-100"
            />
          </div>
          <div className="pt-5">
            <h1 className="text-white text-xl font-bold">Mustafa Elgmal</h1>
            <button className="mt-5 px-5 py-2 bg-gray-500 text-gray-300 uppercase hover:bg-gray-400 hover:text-white">
              Follow
            </button>
          </div>
        </div>
        <div className="flex py-20 space-x-6">
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
      <div className="mx-auto  max-w-7xl  sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
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

export default Profile;