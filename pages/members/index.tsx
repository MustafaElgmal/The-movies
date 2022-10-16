/* eslint-disable @next/next/no-img-element */
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import Header1 from "../../components/header1";
import { classNames, reviews } from "../../constants";

const Members = () => {
  return (
    <div className="bgcolor min-h-screen">
      <div className="memberbg">
        <div className="bg-wraper2">
          <Header1 />
        </div>
      </div>
      <div className="mx-auto px-6  max-w-7xl  sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
        <h3 className="text-gray-500 pb-3">Members</h3>

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
                      <a className="text-sm font-bold text-white">
                        {review.author}
                      </a>
                    </Link>
                    <div className="mt-1 flex items-center  text-gray-400">
                      21 reviews
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
