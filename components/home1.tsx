import Link from "next/link";
import React from "react";
import Buttons from "./buttons";
import Films from "./filmCard";
import Landing from "./landing";

const Home1 = () => {
  return (
    <div className="bg">
      <Landing />
      <Buttons />
      <Films />
    </div>
  );
};

export default Home1;
