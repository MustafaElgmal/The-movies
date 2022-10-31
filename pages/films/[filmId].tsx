/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { prisma } from "../../lib/prisma";
import { classNames, reviews } from "../../constants";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppProps } from "../../types";
import Header from "../../components/header";

const FilmPage = ({ film }: AppProps) => {
  return (
    <div className="bgcolor min-h-screen">
      <div
        className="filmbg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780/${film?.coverPath})`,
        }}
      >
        <div className="bg-wraper2">
          <Header />
        </div>
      </div>
      <div className="flex mx-auto px-6 max-w-7xl  sm:px-6 lg:px-8 gap-20 pb-5">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w780/${film?.profilePath}`}
            alt="film"
            width={700}
          />
        </div>

        <div>
          <h1 className="font-extrabold text-xl sm:text-2xl text-white">
            {film?.name}
          </h1>
          <p className="pt-5 text-gray-400">WELCOME TO {film?.name}.</p>
          <p className="pt-5 text-gray-400">{film?.description}.</p>
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
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.filmId;
  const film = await prisma.film.findFirst({
    where: { id: +id! },
    include: { raviews: true },
  });
  return { props: { film } };
};

export default FilmPage;
