import React from "react";
import TypeNine from "@/components/TypeNine";
import TypeTen from "@/components/TypeTen";
import Type11 from "@/components/barchart/Type11";
import Type12 from "@/components/barchart/Type12";
import Type13 from "@/components/barchart/Type13";
import Type14 from "@/components/barchart/Type14";
import Type15 from "@/components/barchart/Type15";
import Type16 from "@/components/barchart/Type16";
import Type17 from "@/components/barchart/Type17";
import Type18 from "@/components/barchart/Type18";
import Type19 from "@/components/barchart/Type19";
const page = () => {
  return (
   <div className="bg-gray-100 min-h-screen p-3 sm:p-6 lg:p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {/* Card */}
    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>TypeNine</h3>
      <TypeNine />
    </div>

    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>TypeTen</h3>
      <TypeTen />
    </div>

    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type11</h3>
      <Type11 />
    </div>

    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type12</h3>
      <Type12 />
    </div>

    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type13</h3>
      <Type13 />
    </div>

    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type14</h3>
      <Type14 />
    </div>

    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type15</h3>
      <Type15 />
    </div>

    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type16</h3>
      <Type16 />
    </div>

    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type17</h3>
      <Type17 />
    </div>
    
    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type18</h3>
      <Type18 />
    </div>
     <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      <h3>Type19</h3>
      <Type19 />
    </div>
  </div>
</div>

  );
};

export default page;
