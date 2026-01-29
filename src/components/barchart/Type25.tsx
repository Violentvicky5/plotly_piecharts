"use client";

import React from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = {
  label: string;
  value: number;
};

const RECORDS: RecordItem[] = Array.from({ length: 100 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 150) + 20,
}));

export default function Type24() {
  const labels = RECORDS.map((d) => d.label);
  const values = RECORDS.map((d) => d.value);
  const barWidth = 0.5;
const spacing=0.90;
  const xNumeric = labels.map((_, i) => i *spacing);

  const data: any[] = [
    // TABLE 
    {
      type: "table",
 domain: { x: [0, 0.119], y: [0.5, 1] },
 
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

    // BAR CHART — full left alignment
    {
      type: "bar",
      x: xNumeric,
      y: values,
       width: barWidth,
   //   textposition:"outside",
   //   textangle:-90,
     // text:labels,
    // textfont: { size: 0.5, color: "black" },
      xaxis: "x",
      yaxis: "y",
    
      name: "Items",
    },
  ];

  const layout = {
    margin: { l: 20, r: 20, t: 10, b: 10 }, 
    showlegend: false,
   

    xaxis: {
      domain: [0, 1],
      tickvals: xNumeric,
      ticktext: labels,
      showticklabels: false,
      automargin: true,
    },

    yaxis: {
      domain: [0, 0.45],
      automargin: true,
      range: [0, Math.max(...values) * 1.1],
    },

    height: 220,
  };

  return (
    <div className="h-full w-full overflow-x-auto">
      <Plot
        data={data}
        layout={layout}
        style={{
          width: Math.max(labels.length * 25, 800), // horizontal scroll
        //width:1500, 
        height: "100%",
        }}
        config={{ responsive: false, displayModeBar: true,
            displaylogo: false,}}
      />
    </div>
  );
}
