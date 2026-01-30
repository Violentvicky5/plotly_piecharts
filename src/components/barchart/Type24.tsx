"use client";

import React from "react";
import dynamic from "next/dynamic";
import type Plotly from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = {
  label: string;
  value: number;
};

const RECORDS: RecordItem[] = Array.from({ length: 20 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 150) + 20,
}));

export default function Type24() {
  const labels = RECORDS.map((d) => d.label);
  const values = RECORDS.map((d) => d.value);

  //TS-safe: use any[] for multiple trace types
  const data: any[] = [
    // TABLE
    {
      type: "table",
      domain: { x: [0, 0], y: [0.5, 1] },
      header: {
        values: ["Label", "Value"],
        align: "center",
        fill: { color: "#1f2937" },
        font: { color: "white", size: 10 },
        height: 20,
      },
      cells: {
        values: [labels, values],
        align: "center",
        height: 15,
        font: { color: "black", size: 8 },
      },
    },

    // BAR CHART
    {
      type: "bar",
      x: labels,
      y: values,
      xaxis: "x",
      yaxis: "y",
      name: "Items",
      width: 0.1,
    },
  ];

  const layout = {
    margin: { l: 10, r: 20, t: 20, b: 60 },
    showlegend: false,
  

    xaxis: {
      domain: [0, 1],
      showticklabels: false,
      automargin: true,
    },

    yaxis: {
      domain: [0, 0.5],
      automargin: true,
    },

    height: 500,
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <Plot
        data={data}
        layout={layout}
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true }}
        useResizeHandler
      />
    </div>
  );
}
