/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Header1 from "../../components/header1";
import { classNames, reviews } from "../../constants";
import Link from "next/link";


const Film = () => {
  return (
    <div className="bgcolor min-h-screen">
      <div className="filmbg">
        <div className="bg-wraper2">
          <Header1 />
        </div>
      </div>
      <div className="flex mx-auto px-6 max-w-7xl  sm:px-6 lg:px-8 gap-20 pb-5">
        <div>
          <img
            src="https://a.ltrbxd.com/resized/film-poster/5/4/6/3/4/7/546347-don-t-worry-darling-0-230-0-345-crop.jpg?v=f458525152"
            alt="film"
            width={700}
           
          />
        </div>
        
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-white">
              Don’t Worry Darling{" "}
              <span className="block sm:pl-5 sm:inline font-medium text-sm text-gray-400">
                Directed by Mustafa Elgmal
              </span>
            </h1>
            <p className="pt-5 text-gray-400">WELCOME TO VICTORY.</p>
            <p className="pt-5 text-gray-400">
              A 1950s housewife living with her husband in a utopian
              experimental community begins to worry that his glamorous company
              may be hiding disturbing secrets.
            </p>
          </div>
       
      </div>
      <div className="mx-auto  max-w-7xl px-6  sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
        <h3 className="text-gray-500 pb-3">POPULAR REVIEWS</h3>

        <div>
          <div className="divide-y divide-gray-200">
            {reviews.featured.map((review) => (
              <div key={review.id} className="py-12">
                <div className="flex items-center">
                  <img
                    src={review.avatarSrc}
                    alt={`${review.author}.`}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <Link href={`/members/${review.id}`}>
                    <a className="text-sm font-bold text-gray-400">
                      {review.author}
                    </a>
                    </Link>
                    <div className="mt-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            review.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{review.rating} out of 5 stars</p>
                  </div>
                </div>

                <div
                  className="mt-4 space-y-6 text-base italic text-gray-400"
                  dangerouslySetInnerHTML={{ __html: review.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Film;
