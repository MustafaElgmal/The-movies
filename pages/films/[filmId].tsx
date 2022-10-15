/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Header1 from "../../components/header1";
import { classNames } from "../../constants";
import Link from "next/link";
const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 3,
      rating: 2,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 4,
      rating: 3,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

const Film = () => {
  return (
    <div className="bgcolor min-h-screen">
      <div className="filmbg">
        <div className="bg-wraper2">
          <Header1 />
        </div>
      </div>
      <div className="flex mx-auto  max-w-7xl  sm:px-6 lg:px-8 gap-20 pb-5">
        <div>
          <img
            src="https://a.ltrbxd.com/resized/film-poster/5/4/6/3/4/7/546347-don-t-worry-darling-0-230-0-345-crop.jpg?v=f458525152"
            alt="film"
          />
        </div>
        <div>
          <div>
            <h1 className="font-extrabold text-2xl text-white">
              Don’t Worry Darling{" "}
              <span className=" pl-5 font-medium text-sm text-gray-400">
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
      </div>
      <div className="mx-auto  max-w-7xl  sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
        <h3 className="text-white pb-3">POPULAR REVIEWS</h3>

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
