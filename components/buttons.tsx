import React from "react";

const Buttons = () => {
  return (
    <div className="bgcolor w-full">
      <div className="flex mx-auto  max-w-7xl  sm:px-6 lg:px-8 lg:gap-20 pb-5 ">
        <div>
          <h1 className="px-4 py-2 text-lg text-white">Filter By</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  gap-2 ">
          <button className="rounded-full w-full   border border-transparent btn py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            Action
          </button>
          <button className="rounded-full w-full  border border-transparent btn py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            Romantic
          </button>
          <button className="rounded-full w-full  border border-transparent btn py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            Animated
          </button>
          <button className="rounded-full w-full  border border-transparent btn py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            Comedy
          </button>
          <button className="rounded-full w-full  border border-transparent btn py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            Historical
          </button>
          <button className="rounded-full w-full  border border-transparent btn py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            Biographical
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
