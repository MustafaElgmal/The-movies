import React from "react";
import Buttons from "../../components/buttons";
import FilmCards from "../../components/filmCard";
import Header from "../../components/header";

const Films = () => {
  return (
    <div className="bgcolor min-h-screen">
      <Header />
      <div className="pt-40">
        <Buttons />
        <FilmCards />
      </div>
    </div>
  );
};

export default Films;
