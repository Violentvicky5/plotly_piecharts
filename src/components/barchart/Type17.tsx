"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Layout } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = { label: string; value: number };
type EnrichedItem = RecordItem & { percent: number };

const RECORDS: RecordItem[] = Array.from({ length: 50 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 150) + 20,
}));

export default function Type17() {
  const total = useMemo(() => RECORDS.reduce((s, r) => s + r.value, 0), []);

 const enriched: EnrichedItem[] = useMemo(
  () =>
    [...RECORDS]
      .sort((a, b) => b.value - a.value) 
      .map((r) => ({
        ...r,
        percent: total ? (r.value / total) * 100 : 0,
      })),
  [total],
);


  const labels = enriched.map((e) => e.label);
  const values = enriched.map((e) => e.value);
  const percents = enriched.map((e) => e.percent);

  const colors = [
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
  ];

  return (
    <>
      <style jsx global>{`
        .js-plotly-plot .modebar {
          display: flex !important;
          transform: scale(0.5);
          transform-origin: top right;
        }
      `}</style>

      {/* vertical scroll container */}
      <div className="flex-1 w-full overflow-y-auto" style={{ maxHeight: 400 }}>
        <Plot
        data={[
  // independent horizontal lines
  {
    type: "scatter",
    mode: "lines",
    x: values.flatMap((v) => [0, v, null]),
    y: labels.flatMap((l) => [l, l, null]),
    customdata: percents.flatMap((p) => [p, p, null]),
    hovertemplate:
      "%{y}: %{x} (%{customdata:.1f}%)<extra></extra>",
    line: {
      width: 2,
      color: "#636efa",
    },
  },

  // labels at end of line
  {
    type: "scatter",
    mode: "text",
  x: values.map((v) => v + 2), //space labels 2 units right of line end
    y: labels,
    text: labels,
    textposition: "middle right",
    textfont: {
      size: 7,
      color: "black",
    },
    hoverinfo: "skip",
  },
]}



        
          layout={
            {
              autosize: true,
              margin: { t: 20, b: 20, l: 20, r: 20 },
              paper_bgcolor: "lightgray",
              plot_bgcolor: "lightgray",
              showlegend: false,
              xaxis: {
                zeroline: false,
                showgrid: true,
                side: "bottom",
              },

              yaxis: {
                showticklabels: false,
                ticks: "",
                showgrid: false,
                zeroline: false,
                showline: false,
              },
            } 
          }
          config={{
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
          }}
          style={{
            height: Math.max(labels.length * 5, 300),
            width: "100%",
          }}
        />
      </div>
    </>
  );
}
