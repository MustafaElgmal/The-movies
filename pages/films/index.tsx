import React from "react";
import Buttons from "../../components/buttons";
import FilmCards from "../../components/filmCard";
import Header1 from "../../components/header1";

const Films = () => {
  return (
    <div className="bgcolor min-h-screen">
      <Header1 />
      <div className="pt-40">
        <Buttons />
        <FilmCards />
      </div>
    </div>
  );
};

export default Films;
