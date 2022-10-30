import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper";
import { useRouter } from "next/router";
import { AppProps } from "../types";

const UserSwiper = ({ slidesPerView, members }: AppProps) => {
  const router = useRouter();
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={40}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
    >
      {members?.map((user) => (
        <SwiperSlide
          key={user.id}
          onClick={() => router.push(`/members/${user.id}`)}
          className="cursor-pointer flex justify-center group  border border-gray-200"
        >
          <div className="group-hover:opacity-75">
            <div
              style={{
                background: `url(${
                  user?.imageUrl
                    ? user.imageUrl
                    : "https://gdbgnlodeaeojoowuqoc.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjczODk5NiwiZXhwIjoxOTgyMDk4OTk2fQ.m8DMrMAaUazk13SE5o18af1ECIG400iofEsZ_M3_Jvk"
                })`,
                width: "250px",
                height: "250px",
                backgroundSize: "cover",
              }}
            ></div>
            <span className="flex justify-center items-center text-sm font-bold text-white pt-5">
              {user.fullName}
            </span>
            <span className="flex justify-center items-center text-sm font-bold text-white pt-5">
              {user.reviews.length} Reviews
            </span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default UserSwiper;
