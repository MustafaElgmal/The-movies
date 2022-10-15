import Link from "next/link";
import React from "react";
import Buttons from "./buttons";
import Films from "./filmCard";
import Header1 from "./header1";
import Landing from "./landing";

const Home1 = () => {
  return (
    <div className="bg">
      <Header1 />
      <Landing />
      <Buttons />
      <Films />
    </div>
  );
};

export default Home1;
