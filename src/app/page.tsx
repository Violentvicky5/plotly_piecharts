import React from "react";
import ChartCard from "@/components/ChartCard";

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
import Type20 from "@/components/barchart/Type20";
import Type21 from "@/components/barchart/Type21";
import Type22 from "@/components/barchart/Type22";
import Type23 from "@/components/Type23";

const page = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-3 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <ChartCard title="TypeNine">
          <TypeNine />
        </ChartCard>

        <ChartCard title="TypeTen">
          <TypeTen />
        </ChartCard>

        <ChartCard title="Type11">
          <Type11 />
        </ChartCard>

        <ChartCard title="Type12">
          <Type12 />
        </ChartCard>

        <ChartCard title="Type13">
          <Type13 />
        </ChartCard>

        <ChartCard title="Type14">
          <Type14 />
        </ChartCard>

        <ChartCard title="Type15">
          <Type15 />
        </ChartCard>

        <ChartCard title="Type16">
          <Type16 />
        </ChartCard>

        <ChartCard title="Type17">
          <Type17 />
        </ChartCard>

        <ChartCard title="Type18">
          <Type18 />
        </ChartCard>

        <ChartCard title="Type19">
          <Type19 />
        </ChartCard>

        <ChartCard title="Type20">
          <Type20 />
        </ChartCard>

           <ChartCard title="Type21">
          <Type21 />
        </ChartCard>

        <ChartCard title="Type22">
            <Type22
        x={["A", "B", "C", "D"]}
        y={[10, 25, 15, 30]}
        name="Sales"
      />
        </ChartCard>


<ChartCard title="type23">
    <Type23
        values={[40, 30, 20, 10]}
        labels={["A", "B", "C", "D"]}
      />
</ChartCard>

      </div>
    </div>
  );
};

export default page;
