"use client";

import dynamic from "next/dynamic";
import type { Data, Layout, Config } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type BarTrace = Data & {
  type: "bar";
};

export default function Type21() {
  const data: BarTrace[] = [
    {
      type: "bar",
      name: "Revenue",
      x: ["Q1", "Q2", "Q3", "Q4", "q5", "q6", "q7"],
      y: [40, 55, 30, 70, 80, 90, 30, 55],

      error_y: {
        type: "data",
        array: [5, 5, 4, 6],
        visible:true,
      },

      offset: -0.12,
      cliponaxis: false,

      marker: {
        line: { width: 1 },
      },
    },
    {
      type: "bar",
      name: "Expenses",
      x: ["Q1", "Q2", "Q3", "Q4", "q5", "q6", "q7", "q8"],
      y: [25, 35, 20, 45, 55, 65, 75, 85],

      error_y: {
        type: "data",
        array: [3, 5, 2, 4], //top I size 
        visible: true,
      },

      offset: 0.2,  // ttrace 2 shifting alignment
      cliponaxis: false,
    },
  ];

  const layout: Partial<Layout> = {
   // title: { text: "Bar Chart – barmode, error, offset" },
    barmode: "stack",
    bargap: 0.25,
    bargroupgap: 0.2,

    xaxis: {
      title: { text: "Quarter" },
      automargin: true,
    },
    yaxis: {
      title: { text: "Amount" },
      automargin: true,
      zeroline: true,
    },

    margin: { t: 40, l: 40, r: 20, b: 40 },
  };

  const config: Partial<Config> = {
    displayModeBar: true,
    responsive: true,
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
