"use client";

import React, { useState } from "react";
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
  const [chartReady, setChartReady] = useState(false);

  const labels = RECORDS.map((d) => d.label);
  const values = RECORDS.map((d) => d.value);
  const barWidth = 0.5;
  const spacing = 0.9;
  const xNumeric = labels.map((_, i) => i * spacing);

  const barData: any[] = [
    {
      type: "bar",
      x: xNumeric,
      y: values,
      width: barWidth,
      xaxis: "x",
      yaxis: "y",
      name: "Items",
    },
  ];

  const layout = {
    margin: { l: 10, r: 20, t: 10, b: 10 },
    showlegend: false,
    xaxis: {
      tickvals: xNumeric,
      ticktext: labels,
      showticklabels: false,
      automargin: true,
    },
    yaxis: {
      automargin: true,
      range: [0, Math.max(...values) * 1.1],
    },
    height: 220,
  };

  const plotWidth = Math.min(Math.max(labels.length * 25, 800), 2000);

  return (
    <div className="flex gap-2">
      <div
        className="w-[130px] h-64 overflow-y-auto border border-gray-300 transition-opacity duration-500"
        style={{ opacity: chartReady ? 1 : 0 }}
      >
        <table className="table-auto w-full text-sm">
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="border px-2">Label</th>
              <th className="border px-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {RECORDS.map((r, i) => (
              <tr key={i} className="even:bg-gray-100">
                <td className="border px-2">{r.label}</td>
                <td className="border px-2">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar chart scrollable x-axis */}
      <div className="flex-1 overflow-x-auto">
        <Plot
          data={barData}
          layout={{ ...layout, width: plotWidth }}
          style={{ width: plotWidth, height: "100%" }}
          config={{ responsive: false, displayModeBar: true, displaylogo: false }}
          onInitialized={() => setChartReady(true)} // table opacity triggered here
        />
      </div>
    </div>
  );
}
