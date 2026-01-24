"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = {
  label: string;
  value: number;
};

type EnrichedItem = RecordItem & {
  percent: number;
};

const RECORDS: RecordItem[] = Array.from({ length: 500 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 150) + 20,
}));

export default function Type11() {
  const [chartReady, setChartReady] = useState(false);

 const total = useMemo(() => RECORDS.reduce((s, r) => s + r.value, 0), [RECORDS]);
const enriched = useMemo(() => 
  RECORDS.map(r => ({
    ...r,
    percent: total ? (r.value / total) * 100 : 0,
  })), [RECORDS, total]);


  const labels = useMemo(() => enriched.map((e) => e.label), [enriched]);
  const values = useMemo(() => enriched.map((e) => e.value), [enriched]);
  const percents = enriched.map((e) => e.percent);
  const colors = useMemo(
    () => [
      "#636efa",
      "#EF553B",
      "#00cc96",
      "#ab63fa",
      "#FFA15A",
      "#19d3f3",
      "#FF6692",
      "#B6E880",
      "#FF97FF",
      "#FECB52",
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
    ],
    [],
  );

  const barColors = labels.map((_, i) => colors[i % colors.length]);  

  return (
    <div className="w-full h-full flex flex-col">
       <style jsx global>{`
        .js-plotly-plot .modebar {
        display: flex !important;
          transform: scale(0.5);
          transform-origin:  right;
        }
      `}</style>
      {/* Bar chart */}
<div className="w-full h-[165px] overflow-x-auto overflow-y-visible">
        <Plot
          data={[
            {
              type: "bar",
              x: labels,
              y: values,
              width: labels.map(() => 0.4),

              marker: { color: barColors },
           //   text: labels,
           //     textposition: "inside",
           //   textangle: -90,
              textfont: {
                size: 7,
                color: "black",
              },

 customdata: percents,
              hovertemplate: "%{x}: %{y} (%{customdata:.1f}%)<extra></extra>",
                     },
          ]}
          layout={{
            height: 145,
            autosize: true,
              bargap: 0.015,   
            margin: { t: 20, b: 10, l: 20, r: 10 },
            paper_bgcolor: "lightgray",
            plot_bgcolor: "lightgray",
            xaxis: {
              showticklabels: false,
              showgrid: false,
              zeroline: false,
            },
            // xaxis: { tickfont: { size: 7 }, automargin: true },
            yaxis: { tickfont: { size: 7 }, automargin: true },

            showlegend: false,
          }}
          config={{
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
          }}
          style={{
            width: labels.length * 10,
            minWidth: "100%",
            height: "100%",
          }}
          onInitialized={() => setChartReady(true)}
        />
      </div>

      {/* Static legend card (same behavior as pie) */}
      <div
        className={`flex justify-center items-center transition-opacity ${
          chartReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mt-2 grid grid-cols-3 gap-3 overflow-y-auto max-h-[80px]">
          {enriched.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-0.5 text-[8px]"
            >
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="">
                {item.label} — {item.percent.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
