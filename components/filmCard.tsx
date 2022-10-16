/* eslint-disable @next/next/no-img-element */

import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { classNames, films } from "../constants";
export default function FilmCard() {
  return (
    <div className="bgcolor">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">films</h2>

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
      <div>
        <h1 className=" flex justify-end xl:mr-36 text-xl font-bold uppercase txt cursor-pointer">more</h1>
       
      </div>
    </div>
  );
}
