import React from "react";
import TypeNine from "@/components/TypeNine";
import TypeTen from "@/components/TypeTen";
const page = () => {

  return (
    <div className="bg-gray-100 min-h-screen p-3 sm:p-6 lg:p-8 m-0">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">        <div className="bg-white rounded-xl p-3 sm:p-4 flex justify-center items-center w-full max-w-[350px] h-[300px]">
          <TypeNine />
        </div>

       <div className="bg-white rounded-xl p-2 sm:p-4 flex justify-center items-center w-full max-w-[350px] h-[300px]">
          <TypeTen />
        </div>
      </div>
    </div>
  );
};

export default page;
