/* eslint-disable @next/next/no-img-element */
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import RecomendedUser from "../../components/recomendedUser";
import { prisma } from "../../lib/prisma";
import { useAppSelector } from "../../redux/app/hookes";
import { AppProps, userType } from "../../types";
import { getReconebdedUsers } from "../../utils/functions";

const Members = ({ members }: AppProps) => {
  const user = useAppSelector((state) => state.profileSlice.profile);
  const [recomendUsers, setUser] = useState<userType[]>([]);

  useEffect(() => {
    getReconebdedUsers(members!, setUser, user.favoriteFilms, user.id);
  }, []);
  return (
    <div className="bgcolor min-h-screen">
      <div className="memberbg">
        <div className="bg-wraper2">
          <Header />
        </div>
      </div>

      <div>
        <div className="mx-auto px-6  max-w-7xl  sm:px-3 lg:px-8 lg:gap-20 pb-5 pt-10">
          <h3 className="text-gray-500">People You May Know</h3>
        </div>
        <RecomendedUser members={recomendUsers} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/signin",
  async getServerSideProps(ctx) {
    const members = await prisma.user.findMany({
      include: { favoriteFilms: true, reviews: true },
    });

    return { props: { members } };
  },
});

export default Members;
