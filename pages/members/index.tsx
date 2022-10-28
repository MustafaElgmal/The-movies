/* eslint-disable @next/next/no-img-element */

import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Header from "../../components/header";
import { prisma } from "../../lib/prisma";
import { AppProps } from "../../types";

const Members = ({ members }: AppProps) => {
  return (
    <div className="bgcolor min-h-screen">
      <div className="memberbg">
        <div className="bg-wraper2">
          <Header />
        </div>
      </div>
      <div className="mx-auto px-6  max-w-7xl  sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
        <h3 className="text-gray-500 pb-3">Members</h3>

        <div>
          <div className="divide-y divide-gray-200">
            {members?.map((member) => (
              <div key={member.id} className="py-12">
                <div className="flex items-center">
                  <img
                    src={`${
                      member.imageUrl
                        ? member.imageUrl
                        : "https://gdbgnlodeaeojoowuqoc.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjczODk5NiwiZXhwIjoxOTgyMDk4OTk2fQ.m8DMrMAaUazk13SE5o18af1ECIG400iofEsZ_M3_Jvk"
                    }`}
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <Link href={`/members/${member.id}`}>
                      <a className="text-sm font-bold text-white">
                        {member.fullName}
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

export const getServerSideProps: GetServerSideProps = async () => {
  let members: User[] = [];
  try {
    members = await prisma.user.findMany({ include: { reviews: true } });
    return { props: { members } };
  } catch (e) {
    console.log(e);
  }
  return { props: { members } };
};

export default Members;
